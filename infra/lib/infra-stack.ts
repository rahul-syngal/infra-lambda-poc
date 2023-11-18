import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { BundlingOutput } from 'aws-cdk-lib';

export class InfraStackNew extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

        const lambdaFunction = new lambda.Function(this, 'YourLambdaFunction', {
          runtime: lambda.Runtime.DOTNET_6, // or appropriate runtime
          code: lambda.Code.fromAsset('../apps/TestAPI/', {
            bundling: {
              image: lambda.Runtime.DOTNET_6.bundlingImage,
              user: "root",
              outputType: cdk.BundlingOutput.ARCHIVED,
              command: [
                "/bin/sh",
                "-c",
                " dotnet tool install -g Amazon.Lambda.Tools"+
                " && dotnet build"+
                " && dotnet lambda package --output-package /asset-output/function.zip"
              ],
            },
          }),
          handler: 'TestAPI',
    });

    const api = new apigateway.LambdaRestApi(this, 'myapi', {
      handler: lambdaFunction,
      proxy: true
    });
  }
}
