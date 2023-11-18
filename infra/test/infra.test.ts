import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Infra from '../lib/infra-stack';
import * as lambda from 'aws-cdk-lib/aws-lambda';


test('Lambda Function Created with Correct Configuration', () => {
    const app = new cdk.App();
    const stack = new Infra.InfraStackNew(app, 'MyTestStack');

    // Prepare the stack for assertions.
    const template = Template.fromStack(stack);
    template.hasResourceProperties("AWS::Lambda::Function", {
        Handler: "TestAPI"
    });
});

test('Stack has correct number of resources', () => {
    const app = new cdk.App();
    const stack = new Infra.InfraStackNew(app, 'MyTestStack');

    // Prepare the stack for assertions.
    const template = Template.fromStack(stack);
    expect(template.allResources.length).toBe(2); // Assuming there are 2 resources in the stack
});


