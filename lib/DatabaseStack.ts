import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, BillingMode, Table, TableEncryption } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { DeployEnvironment, name } from "../bin/KeyCoach";
import * as backup from "aws-cdk-lib/aws-backup";

export class DatabaseStack extends Stack {
  readonly sampleTable: Table;

  constructor(
    scope: Construct,
    id: string,
    props: StackProps & {
      environment: DeployEnvironment;
    },
  ) {
    super(scope, id, props);

    this.sampleTable = new Table(this, name("SampleTable", props.environment), {
      partitionKey: { name: "email", type: AttributeType.STRING },
      billingMode: BillingMode.PROVISIONED,
      tableName: name("SampleTable", props.environment),
      readCapacity: 5,
      writeCapacity: 5,
      removalPolicy:
        props.environment === "Production" ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      encryption: TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
    });

    if (props.environment === "Production") {
      const backupVault = new backup.BackupVault(this, name("SampleBackup", props.environment), {
        backupVaultName: name("SampleBackup", props.environment),
      });

      const plan = new backup.BackupPlan(this, name("SampleBackupPlan", props.environment));

      plan.addRule(backup.BackupPlanRule.weekly(backupVault));
      plan.addRule(backup.BackupPlanRule.monthly1Year(backupVault));

      plan.addSelection("SampleBackupSelection", {
        resources: [backup.BackupResource.fromDynamoDbTable(this.sampleTable)],
      });
    }
  }
}
