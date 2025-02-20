"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageUtilities = void 0;
const franc_1 = require("franc");
const langs_1 = require("langs");
const languageSets_1 = require("../data/languageSets");
const detectLanguage = (text) => {
    const langCode = (0, franc_1.franc)(text);
    const language = langs_1.default.where("3", langCode);
    if (language)
        return language.name;
    else
        throw new Error("Language Cannot be Determined");
};
const extractSentences = (keyword, text) => {
    const regex = new RegExp(`[^.?!]*\\b${keyword}\\b[^.?!]*[.?!]`, "i");
    return text.match(regex) || null;
};
const selectLanguageNameArray = (text) => {
    const listingLanguage = exports.languageUtilities.detectLanguage(text);
    let langNameArray;
    if (listingLanguage) {
        if (listingLanguage == "Finnish")
            return languageSets_1.francLanguageListFinnish;
        else
            return languageSets_1.francLanguageListEnglish;
    }
    return langNameArray;
};
exports.languageUtilities = {
    detectLanguage,
    extractSentences,
    selectLanguageNameArray,
};
