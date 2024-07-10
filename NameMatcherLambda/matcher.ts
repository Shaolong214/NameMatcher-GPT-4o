import { APIGatewayEvent, Context } from 'aws-lambda';
import OpenAI from 'openai';

// List of names to match against
const namesList = [
    "David Smith 大卫 斯密斯",
    "Yueling Zhang 月林张",
    "Huawen Wu 华文吴",
    "Annie Lee 李安妮"
];

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // API Key stored in environment variables
});

// Function to find the best match using OpenAI
async function findMatch(inputName: string): Promise<string | null> {
    try {
        const prompt = `Find the best matching name in the list for: ${inputName}\nList: ${namesList.join('\n')}`;
        const response = await openai.completions.create({
            model: "text-davinci-002",
            prompt: prompt,
            max_tokens: 60,
            stop: ["\n"]
        });

        // Extract and return the best match
        return response.choices[0].text.trim();
    } catch (error) {
        console.error("Error accessing OpenAI API:", error);
        return null;
    }
}

// Main handler function
export async function handler(event: APIGatewayEvent, context: Context) {
    const inputName = event.queryStringParameters?.name;

    if (!inputName) {
        return { statusCode: 400, body: 'Name parameter is required' };
    }

    const match = await findMatch(inputName);
    if (match) {
        return {
            statusCode: 200,
            body: JSON.stringify({ match })
        };
    } else {
        return {
            statusCode: 404,
            body: 'No matching name found'
        };
    }
}



// import { APIGatewayEvent, Context } from 'aws-lambda';
//
// // // const namesList = [
// // //     "David Smith 大卫 斯密斯",
// // //     "Yueling Zhang 月林张",
// // //     "Huawen Wu 华文吴",
// // //     "Annie Lee 李安妮"
// // // ];
// //
// // type NamePair = {
// //     englishName: string;
// //     chineseName: string;
// // };
// //
// // const nameList: NamePair[] = [
// //     { englishName: 'David Smith', chineseName: '大卫 斯密斯' },
// //     { englishName: 'Yueling Zhang', chineseName: '月林张' },
// //     { englishName: 'Huawen Wu', chineseName: '华文吴' },
// //     { englishName: 'Annie Lee', chineseName: '李安妮' },
// // ];
// //
// // function findMatch(input: string): string | undefined {
// //     // Normalize the input by removing spaces and converting to lower case
// //     const normalizedInput = input.replace(/\s+/g, '').toLowerCase();
// //
// //     for (const namePair of nameList) {
// //         const englishComponents = namePair.englishName.split(' ');
// //         const surname = englishComponents[englishComponents.length - 1].toLowerCase();
// //         const chineseSurnameIndex = namePair.chineseName.indexOf(surname) > 0 ? namePair.chineseName.indexOf(surname) : 0;
// //
// //         // Normalizing and handling Chinese name based on the location of the surname
// //         let normalizedChineseName, reversedChineseName;
// //         if (chineseSurnameIndex === 0) {
// //             // Surname at the beginning
// //             normalizedChineseName = namePair.chineseName.replace(/\s+/g, '').toLowerCase();
// //             reversedChineseName = namePair.chineseName.slice(1) + namePair.chineseName[0];
// //         } else {
// //             // Surname at the end
// //             normalizedChineseName = namePair.chineseName.slice(-1) + namePair.chineseName.slice(0, -1);
// //             reversedChineseName = namePair.chineseName.replace(/\s+/g, '').toLowerCase();
// //         }
// //
// //         if ([normalizedInput].includes(normalizedChineseName) || [normalizedInput].includes(reversedChineseName)) {
// //             return `${namePair.englishName} ${namePair.chineseName}`;
// //         }
// //     }
// //
// //     return undefined; // Return undefined if no match is found
// // }
//
// // function findMatch(input: string): string | undefined {
// //     // Normalize the input by removing spaces and converting to lower case
// //     const normalizedInput = input.replace(/\s+/g, '').toLowerCase();
// //
// //     for (const namePair of nameList) {
// //         // Split names into components and normalize
// //         const englishComponents = namePair.englishName.split(' ').map(x => x.toLowerCase());
// //         const normalizedEnglishName = englishComponents.join('');
// //         const reversedEnglishName = englishComponents.reverse().join('');
// //
// //         // For Chinese names, consider both possible orderings (surname first and last)
// //         const chineseSurname = namePair.chineseName[0];
// //         const chineseGivenName = namePair.chineseName.slice(1);
// //         const normalizedChineseName = (chineseSurname + chineseGivenName).toLowerCase();
// //         const reversedChineseName = (chineseGivenName + chineseSurname).toLowerCase();
// //
// //         if ([normalizedEnglishName, reversedEnglishName, normalizedChineseName, reversedChineseName].includes(normalizedInput)) {
// //             return `${namePair.englishName} ${namePair.chineseName}`;
// //         }
// //     }
// //
// //     return undefined; // Return undefined if no match is found
// // }
//
// // function findMatch(inputName: string): string | null {
// //     return namesList.find(name => name.toLowerCase().includes(inputName.toLowerCase())) || null;
// // }
//
// // function normalizeName(name: string): string[] {
// //     return name.split(/[\s]+/).map(part => part.toLowerCase());
// // }
// //
// // function findMatch(inputName: string): string | null {
// //     const normalizedInput = normalizeName(inputName);
// //     return namesList.find(name => {
// //         const normalizedParts = normalizeName(name);
// //         // Check if all parts of the input name are found in the name string, disregarding order
// //         return normalizedInput.every(inputPart => normalizedParts.includes(inputPart));
// //     }) || null;
// // }
//
// // function normalizeName(name: string): string {
// //     return name.toLowerCase().replace(/\s+/g, '');
// // }
// //
// // function findMatch(inputName: string): string | null {
// //     const normalizedInputName = normalizeName(inputName);
// //     for (const name of namesList) {
// //         const normalizedListName = normalizeName(name);
// //         if (normalizedListName.includes(normalizedInputName) || normalizedInputName.includes(normalizedListName)) {
// //             return name;
// //         }
// //     }
// //     return null;
// // }
//
// // chinese
//
// // function normalizeName(name: string): string {
// //     return name.toLowerCase().replace(/\s+/g, '');
// // }
// //
// // function getChineseNamePermutations(name: string): string[] {
// //     // If the name is in Chinese characters, split and swap parts
// //     if (/[\u3400-\u9FBF]/.test(name)) {
// //         const parts = name.split('');
// //         if (parts.length > 1) {
// //             return [parts.join(''), parts.reverse().join('')];
// //         }
// //     }
// //     return [name];
// // }
// //
// // function findMatch(inputName: string): string | null {
// //     const normalizedInput = normalizeName(inputName);
// //     const inputPermutations = getChineseNamePermutations(normalizedInput);
// //
// //     for (const name of namesList) {
// //         const normalizedListName = normalizeName(name);
// //         if (inputPermutations.some(permutation => normalizedListName.includes(permutation) || permutation.includes(normalizedListName))) {
// //             return name;
// //         }
// //     }
// //     return null;
// // }
//
//
// export async function handler(event: APIGatewayEvent, context: Context) {
//     const inputName = event.queryStringParameters?.name;
//     if (!inputName) {
//         return { statusCode: 400, body: 'Name parameter is required' };
//     }
//
//     const match = findMatch(inputName);
//     return {
//         statusCode: 200,
//         body: JSON.stringify({ match }),
//     };
// }
