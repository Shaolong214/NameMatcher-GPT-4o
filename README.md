# Name Matcher Lambda

## Description
This AWS Lambda function, developed in TypeScript, matches a given human name against a predefined list using OpenAI's API. The function is deployed to the AWS Cloud and can be accessed via API Gateway. This setup utilizes OpenAI's GPT-4o model to enhance the accuracy of name matching, demonstrating best practices in handling large language models (LLMs), such as managing inconsistencies and reducing potential errors. The serverless architecture of AWS Lambda ensures that the function is both scalable and cost-effective, catering to a wide range of applications that require dynamic name matching capabilities.


## Features
- **Name Matching**: Matches a given name input against a predefined list of names.
- **OpenAI Integration**: Utilises OpenAI's GPT-4o Turbo model to enhance matching accuracy.
- **AWS Lambda**: Runs as a serverless function, reducing the need for server management.
- **API Gateway**: Accessible via REST API, testable through tools like Postman.

## Prerequisites
- AWS Account
- Node.js
- npm (Node Package Manager)
- AWS CLI configured with appropriate permissions
- OpenAI API key

## Setup and Installation
1. **Clone the Repository**:
git clone https://github.com/yourusername/name-matcher-lambda.git
```bash
cd name-matcher-lambda
```

2. **Install Dependencies**:
```bash
npm install
```

3. **Compile TypeScript to JavaScript**:
```bash
npx tsc
```

4. **Configure AWS Credentials** (if not already done):
```bash
aws configure
```

5. **Set up Environment Variables**:
- Add your OpenAI API key to the Lambda function's environment variables:
  - `OPENAI_API_KEY`: Your OpenAI API key.

6. **Zip the Deployment Package**:
```bash
zip -r deployment_package.zip ./*
```

7. **Deploy the Lambda Function**:
- Manual Deployment:
  - Upload the `deployment_package.zip` to AWS Lambda via the AWS Management Console.
- Using AWS CDK:
  - Ensure AWS CDK is installed (`npm install -g aws-cdk`).
  - Deploy using CDK scripts defined in your repository.

## Usage
**Invoke via API Gateway**:
- After deployment, navigate to API Gateway in the AWS Console.
- Use the Invoke URL provided by API Gateway in Postman or any HTTP client:
  ```
  GET https://<api-id>.execute-api.<region>.amazonaws.com/prod/match?name=David
  ```

## Testing
- **Local Testing**:
  - To run local tests for the Lambda function, execute the following command in your terminal:
```bash
node testLocal.js
```
- **Postman Testing**:
  - Use the provided Postman collection to test the API. Adjust parameters as needed to test different inputs.
