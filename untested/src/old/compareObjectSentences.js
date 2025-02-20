"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareObjectSentences = void 0;
const compareObjectSentences = (languageArrays) => {
    const sharedSentences = [];
    const languageMatches = [];
    Object.keys(languageArrays).forEach((language) => {
        const currentLanguageArray = languageArrays[language]; //gets the sentences array for the active language
        const otherLanguagesList = Object.keys(languageArrays).filter((key) => key !== language); //creates the list of languages not active for comparison
        otherLanguagesList.forEach((otherLang) => {
            const otherArray = languageArrays[otherLang]; // gets the sentences of the comparison language
            currentLanguageArray.forEach((sentence) => {
                if (otherArray.some((otherSentence) => otherSentence === sentence)) {
                    sharedSentences.push(sentence);
                    languageMatches.push(otherLang); // add matching sentences to the sharedSentenceArray
                }
            });
        });
    });
    const sharedSentenceSet = [new Set(sharedSentences)];
    const languageMatchSet = [new Set(languageMatches)];
    return { sharedSentenceSet, languageMatchSet };
};
exports.compareObjectSentences = compareObjectSentences;
