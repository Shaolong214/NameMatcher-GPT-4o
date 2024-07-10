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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = handler;
const namesList = [
    "David Smith 大卫 斯密斯",
    "Yueling Zhang 月林张",
    "Huawen Wu 华文吴",
    "Annie Lee 李安妮"
];
function findMatch(inputName) {
    return namesList.find(name => name.toLowerCase().includes(inputName.toLowerCase())) || null;
}
function handler(event, context) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const inputName = (_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.name;
        if (!inputName) {
            return { statusCode: 400, body: 'Name parameter is required' };
        }
        const match = findMatch(inputName);
        return {
            statusCode: 200,
            body: JSON.stringify({ match }),
        };
    });
}
