#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { PipelineStack } from "../lib/PipelineStack";

// Sets the log level for the lambda functions
// Allowed values:
// DEBUG | INFO | WARN | ERROR
const LOG_LEVEL = "DEBUG";

const app = new cdk.App();

export type DeployEnvironment = "Production" | "Staging" | "Testing";

const env = { account: "", region: "us-east-1" }; // TODO: Get account number

export function name(resource: string, environment: DeployEnvironment) {
  return `KeyCoach-${resource}-${environment}`;
}

// Create three pipeline stacks for the Production, Staging, and Testing environments
new PipelineStack(app, name("PipelineStack", "Production"), {
  stackName: name("PipelineStack", "Production"),
  branch: "main",
  environment: "Production",
  logLevel: LOG_LEVEL,
  env,
});

//new PipelineStack(app, name("PipelineStack", "Staging"), {
//  stackName: name("PipelineStack", "Staging"),
//  branch: "staging",
//  environment: "Staging",
//  logLevel: LOG_LEVEL,
//  env,
//});
//
//new PipelineStack(app, name("PipelineStack", "Testing"), {
//  stackName: name("PipelineStack", "Testing"),
//  branch: "testing",
//  environment: "Testing",
//  logLevel: LOG_LEVEL,
//  env,
//});
