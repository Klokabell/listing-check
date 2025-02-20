"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multilingualCheck = void 0;
const multilingualCheck = (sentenceArray, langArray) => {
    const result = {
        languages: new Set(),
        examples: [],
    };
    sentenceArray.forEach((sentence) => {
        const matchedLanguages = langArray.filter((lang) => secondLangRegexCheck(lang, sentence));
        if (matchedLanguages.length > 0) {
            result.examples.push(sentence);
            matchedLanguages.forEach((match) => result.languages.add(match));
        }
    });
    return {
        languages: Array.from(result.languages),
        examples: result.examples,
    };
};
exports.multilingualCheck = multilingualCheck;
const secondLangRegexCheck = (secondLang, sentence) => {
    const regex = new RegExp(`\\b(and ${secondLang}|${secondLang} and)\\b`, "i");
    return regex.test(sentence);
};
