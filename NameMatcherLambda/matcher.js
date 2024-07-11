"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = handler;
const openai_1 = __importDefault(require("openai"));
// List of names to match against
const namesList = [
    "David Smith 大卫 斯密斯",
    "Yueling Zhang 月林张",
    "Huawen Wu 华文吴",
    "Annie Lee 李安妮"
];
// Initialise OpenAI client
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
function findMatch(inputName) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const prompt = `Given the name "${inputName}", identify the exact match from the following list or indicate if a partial match exists:\n\n` +
                namesList.map(name => `- ${name}`).join('\n') +
                `\n\nWhich one of these names fully or partially matches the input? Respond with only the full name.`;
            const response = yield openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "system", content: prompt }],
                max_tokens: 60
            });
            const potentialName = (_a = response.choices[0].message.content) === null || _a === void 0 ? void 0 : _a.trim();
            // Verify if the returned name is indeed from the list to ensure accuracy
            return namesList.includes(potentialName) ? potentialName : null;
        }
        catch (error) {
            console.error("Error accessing OpenAI API:", error);
            return null;
        }
    });
}
function handler(event, context) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const inputName = (_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.name;
        if (!inputName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Name parameter is required' }),
                headers: { 'Content-Type': 'application/json' }
            };
        }
        const match = yield findMatch(inputName);
        if (match) {
            return {
                statusCode: 200,
                body: JSON.stringify({ match }),
                headers: { 'Content-Type': 'application/json' }
            };
        }
        else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No matching name found' }),
                headers: { 'Content-Type': 'application/json' }
            };
        }
    });
}
