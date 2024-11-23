import * as cdk from "aws-cdk-lib";
import * as pipelines from "aws-cdk-lib/pipelines";
import { DatabaseStack } from "./DatabaseStack";
import { ComputeStack } from "./ComputeStack";
import { Construct } from "constructs";
import { StageProps } from "aws-cdk-lib/aws-codepipeline";
import { DeployEnvironment, name } from "../bin/KeyCoach";

export class PipelineStack extends cdk.Stack {
  constructor(
    scope: cdk.App,
    id: string,
    props: cdk.StackProps & {
      branch: string;
      environment: DeployEnvironment;
      logLevel: string;
    },
  ) {
    super(scope, id, props);

    // Create a pipeline connected to this GitHub repository
    const pipeline = new pipelines.CodePipeline(this, name("Pipeline", props.environment), {
      pipelineName: name("Pipeline", props.environment),
      selfMutation: true,
      synth: new pipelines.ShellStep("Synth", {
        input: pipelines.CodePipelineSource.connection("KeyCoach/key-coach", props.branch, {
          connectionArn: "", // TODO: get connection Arn
        }),
        commands: ["cd backend", "npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    // create the deployment stage to the pipeline
    const deploymentStage = new DeploymentStage(this, `Deploy`, {
      env: props.env,
      stageName: `Deploy`,
      logLevel: props.logLevel,
      environment: props.environment,
    });

    // Add the deployment stage to the pipeline
    pipeline.addStage(deploymentStage);
  }
}

class DeploymentStage extends cdk.Stage {
  constructor(
    scope: Construct,
    id: string,
    props: StageProps & {
      env?: cdk.Environment;
      logLevel: string;
      environment: DeployEnvironment;
    },
  ) {
    super(scope, id, props);

    // Create the database stack
    const databaseStack = new DatabaseStack(this, name("DatabaseStack", props.environment), {
      env: props.env,
      stackName: name("DatabaseStack", props.environment),
      environment: props.environment,
    });

    // Create the REST API stack
    const computeStack = new ComputeStack(this, name("ComputeStack", props.environment), {
      env: props.env,
      stackName: name("ComputeStack", props.environment),
      logLevel: props.logLevel,
      environment: props.environment,
      sampleTable: databaseStack.sampleTable,
    });

    computeStack.addDependency(databaseStack);
  }
}
