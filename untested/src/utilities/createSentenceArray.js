"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSentenceArray = void 0;
const createSentenceArray = (keyword, text) => {
    const regex = new RegExp(`[^.?!]*\\b${keyword}\\b[^.?!]*[.?!]`, "gi");
    return text.match(regex) || null;
};
exports.createSentenceArray = createSentenceArray;
