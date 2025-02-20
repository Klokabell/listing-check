"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textProcessor = void 0;
const extractLanguageSentences_1 = require("./findLangRequirements/extractLanguageSentences");
const filterCommunicationSentences_1 = require("./findLangRequirements/filterCommunicationSentences");
const textProcessor = (listingText, userLanguage) => {
    let sentencesObject;
    const filteredSentenceObject = {};
    console.log("userLanguae: ", userLanguage);
    //Retrieve sentences containing language names
    try {
        sentencesObject = (0, extractLanguageSentences_1.extractLanguageSentences)(listingText);
        if (!sentencesObject) {
            console.log("no language names found");
            return null;
        }
        else
            console.log("sentencesObject", sentencesObject);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`error building language names array`, error.message);
            return [];
        }
    }
    //Filter sentences referring to communication
    try {
        if (sentencesObject) {
            const languages = Object.keys(sentencesObject);
            languages.forEach((language) => {
                const communicationSentences = (0, filterCommunicationSentences_1.filterCommunicationSentences)(sentencesObject[language]);
                if (communicationSentences && communicationSentences.length > 0) {
                    filteredSentenceObject[language] = communicationSentences;
                }
            });
        }
        console.log("filteredSentenceObject: ", filteredSentenceObject);
    }
    catch (error) {
        console.error(error);
        return [];
    }
    // Check for requirements
    try {
    }
    catch (error) {
    }
};
exports.textProcessor = textProcessor;
