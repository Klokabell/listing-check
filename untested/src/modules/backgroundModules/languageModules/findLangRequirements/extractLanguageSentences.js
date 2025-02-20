"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractLanguageSentences = void 0;
const languageUtilities_1 = require("../../../../utilities/languageUtilities");
const extractLanguageSentences = (text) => {
    let languageNameArray;
    const languageObject = {};
    console.log("running createSentenceArray");
    //determines which language name list to use
    try {
        languageNameArray = languageUtilities_1.languageUtilities.selectLanguageNameArray(text);
        if (languageNameArray)
            console.log("languageNameArray: ", languageNameArray[0]);
    }
    catch (error) {
        if (error instanceof Error)
            if (error.message == "Language Cannot be Determined") {
                return null;
            }
            else
                throw error;
    }
    // extracts all sentences that have names on the list
    if (!languageNameArray)
        return null;
    for (const language of languageNameArray) {
        const sentenceArray = languageUtilities_1.languageUtilities.extractSentences(language, text);
        if (sentenceArray && sentenceArray.length > 0) {
            languageObject[language] = sentenceArray;
        }
    }
    if (Object.keys(languageObject).length === 0)
        return null;
    return languageObject;
};
exports.extractLanguageSentences = extractLanguageSentences;
