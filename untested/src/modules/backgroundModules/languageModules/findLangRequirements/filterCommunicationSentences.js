"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterCommunicationSentences = void 0;
const regexLists_1 = require("../../../../sets/regexLists");
const filterCommunicationSentences = (sentenceArray) => {
    console.log("filterCommunicationSentences input: ", sentenceArray);
    const primaryTermsKeys = Object.keys(regexLists_1.primaryLanguageTermRegexes);
    const secondaryTermsKeys = Object.keys(regexLists_1.secondaryLanguageTermRegexes);
    let communicationSentences;
    const filterByTerm = (sentenceArray, termKey, regexList) => {
        const communicationSentences = sentenceArray.filter((sentence) => {
            const matchedSentences = termKey.some((term) => {
                const cleanedSentence = sentence.replace(/\n/g, " ");
                const regex = regexList[term];
                if (regex) {
                    return regex.test(cleanedSentence);
                }
                return false;
            });
            return matchedSentences;
        });
        return communicationSentences;
    };
    console.log("running primaryTermsKeys");
    communicationSentences = filterByTerm(sentenceArray, primaryTermsKeys, regexLists_1.primaryLanguageTermRegexes);
    console.log("communicationSentences", communicationSentences);
    if (communicationSentences.length > 0)
        return communicationSentences;
    else {
        console.log("running TermsKeys");
        communicationSentences = filterByTerm(sentenceArray, secondaryTermsKeys, regexLists_1.secondaryLanguageTermRegexes);
    }
    if (communicationSentences.length > 0)
        return communicationSentences;
    else
        return null;
};
exports.filterCommunicationSentences = filterCommunicationSentences;
