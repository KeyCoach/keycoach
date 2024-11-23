import {
  aws_route53,
  aws_route53_targets,
  Duration,
  RemovalPolicy,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from "path";
import * as logs from "aws-cdk-lib/aws-logs";
import {
  IResource,
  LambdaIntegration,
  MockIntegration,
  PassthroughBehavior,
  Resource,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { DeployEnvironment, name } from "../bin/KeyCoach";

export interface ComputeProps extends StackProps {
  logLevel: string;
  environment: DeployEnvironment;
  sampleTable: Table;
}

export class ComputeStack extends Stack {
  // Helper function to create a log group for the Lambda function
  private static createLogGroup(scope: Construct, func: NodejsFunction, uniqueID: string) {
    new logs.LogGroup(scope, uniqueID, {
      logGroupName: `/aws/lambda/${func.functionName}`,
      retention: logs.RetentionDays.TWO_WEEKS,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }

  constructor(scope: Construct, id: string, props: ComputeProps) {
    super(scope, id, props);

    const HANDLER_PATH = path.join(__dirname, `/../resources/handlers`);

    const sharedLambdaProps: NodejsFunctionProps = {
      bundling: {
        externalModules: [
          "@aws-sdk/", // Use the 'aws-sdk' available in the Lambda runtime
        ],
        nodeModules: [
          "@aws-lambda-powertools/logger",
          "@aws-lambda-powertools/tracer" /*"aws-jwt-verify"*/,
        ],
      },
      depsLockFilePath: path.join(__dirname, "../package-lock.json"),
      environment: {
        SERVER_ENV: props.environment.toLowerCase(),
        LOG_LEVEL: props.logLevel,
        SAMPLE_TABLE_NAME: props.sampleTable.tableName,
      },
      runtime: Runtime.NODEJS_20_X,
      timeout: Duration.seconds(60),
    };

    // ########################### Domains ###########################

    const rootDomain = "keycoa.ch";

    const subDomains = {
      Production: "prod.api",
      Staging: "staging.api",
      Testing: "testing.api",
    };

    const hostedZone = aws_route53.HostedZone.fromLookup(this, "BackendHostedZone", {
      domainName: rootDomain,
    });

    const domainCert = Certificate.fromCertificateArn(
      this,
      name("DomainCert", props.environment),
      "", // TODO: Get domain certification ARN
    );

    // ########################### Backend API ###########################
    const sampleHandler = new NodejsFunction(this, name("SampleHandler", props.environment), {
      functionName: name("SampleHandler", props.environment),
      entry: HANDLER_PATH + "/SampleHandler/index.ts",
      ...sharedLambdaProps,
    });

    const sampleIntegration = new LambdaIntegration(sampleHandler, {
      proxy: true,
    });

    const keyCoachRestApi = new RestApi(this, name("ComputeApi", props.environment), {
      restApiName: name("ComputeApi", props.environment),
      domainName: {
        domainName: `${subDomains[props.environment]}.${rootDomain}`,
        certificate: domainCert,
      },
    });

    const sampleResource: Resource = keyCoachRestApi.root.addResource("sample");

    sampleResource.addMethod("GET", sampleIntegration);
    sampleResource.addMethod("POST", sampleIntegration);
    addCorsOptions(sampleResource);

    props.sampleTable.grantReadWriteData(sampleHandler);

    ComputeStack.createLogGroup(this, sampleHandler, "LogGroup/GetMarketEntryDataHandler");

    // ########################### Route53 Records ###########################

    new aws_route53.ARecord(this, name("ComputeApiDomain", props.environment), {
      zone: hostedZone,
      recordName: subDomains[props.environment],
      target: aws_route53.RecordTarget.fromAlias(
        new aws_route53_targets.ApiGateway(keyCoachRestApi),
      ),
    });
  }
}

export function addCorsOptions(apiResource: IResource) {
  apiResource.addMethod(
    "OPTIONS",
    new MockIntegration({
      integrationResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers":
              "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
            "method.response.header.Access-Control-Allow-Origin": "'*'",
            "method.response.header.Access-Control-Allow-Credentials": "'false'",
            "method.response.header.Access-Control-Allow-Methods":
              "'OPTIONS,GET,PUT,POST,PATCH,DELETE'",
          },
        },
      ],
      passthroughBehavior: PassthroughBehavior.NEVER,
      requestTemplates: {
        "application/json": '{"statusCode": 200}',
      },
    }),
    {
      methodResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers": true,
            "method.response.header.Access-Control-Allow-Methods": true,
            "method.response.header.Access-Control-Allow-Credentials": true,
            "method.response.header.Access-Control-Allow-Origin": true,
          },
        },
      ],
    },
  );
}
