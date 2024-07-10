import { APIGatewayEvent, Context } from 'aws-lambda';

const namesList = [
    "David Smith 大卫 斯密斯",
    "Yueling Zhang 月林张",
    "Huawen Wu 华文吴",
    "Annie Lee 李安妮"
];

function findMatch(inputName: string): string | null {
    return namesList.find(name => name.toLowerCase().includes(inputName.toLowerCase())) || null;
}

export async function handler(event: APIGatewayEvent, context: Context) {
    const inputName = event.queryStringParameters?.name;
    if (!inputName) {
        return { statusCode: 400, body: 'Name parameter is required' };
    }

    const match = findMatch(inputName);
    return {
        statusCode: 200,
        body: JSON.stringify({ match }),
    };
}
