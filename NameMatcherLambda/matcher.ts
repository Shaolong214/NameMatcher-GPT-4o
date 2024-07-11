import { APIGatewayEvent, Context } from 'aws-lambda';
import OpenAI from 'openai';

// List of names to match against
const namesList = [
    "David Smith 大卫 斯密斯",
    "Yueling Zhang 月林张",
    "Huawen Wu 华文吴",
    "Annie Lee 李安妮"
];

// Initialise OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function findMatch(inputName: string): Promise<string | undefined | null> {
    try {
        const prompt = `Given the name "${inputName}", identify the exact match from the following list or indicate if a partial match exists:\n\n` +
            namesList.map(name => `- ${name}`).join('\n') +
            `\n\nWhich one of these names fully or partially matches the input? Respond with only the full name.`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{role: "system", content: prompt}],
            max_tokens: 60
        });

        const potentialName = response.choices[0].message.content?.trim();
        // Verify if the returned name is from the list
        return namesList.includes(<string>potentialName) ? potentialName : null;
    } catch (error) {
        console.error("Error accessing OpenAI API:", error);
        return null;
    }
}

export async function handler(event: APIGatewayEvent, context: Context) {
    const inputName = event.queryStringParameters?.name;

    if (!inputName) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Name parameter is required' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }

    const match = await findMatch(inputName);
    if (match) {
        return {
            statusCode: 200,
            body: JSON.stringify({ match }),
            headers: { 'Content-Type': 'application/json' }
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'No matching name found' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
}
