"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPositiveRegex = exports.checkOptionalLanguage = exports.checkSentenceForKeyWord = exports.checkForRequirement = void 0;
const keyWordLists_1 = require("./keyWordLists");
const regexLists_1 = require("./regexLists");
const checkForRequirement = (sentence, language) => {
    const matches = keyWordLists_1.requirementTermsEnglish.filter((requirement) => {
        const requirementTermRegex = new RegExp(`\\b${language}\\b\\s(?:is|is\\sa|be|be\\sa)?\\s${requirement}`, "i");
        return requirementTermRegex.test(sentence);
    });
    if (matches.length === 1)
        return { multipleMatches: false, matches };
    else if (matches.length > 1)
        return { multipleMatches: true, matches };
    else
        return null;
};
exports.checkForRequirement = checkForRequirement;
const checkSentenceForKeyWord = (sentence, regexTermObject) => {
    const communicationTerms = Object.keys(regexTermObject);
    const matches = communicationTerms.filter((term) => {
        const termRegex = new RegExp(term);
        return termRegex.test(sentence);
    });
    if (matches.length > 0)
        return matches;
    else if (regexTermObject === regexLists_1.primaryLanguageTermRegexes) {
        return (0, exports.checkSentenceForKeyWord)(sentence, regexLists_1.secondaryLanguageTermRegexes);
    }
    else {
        return null;
    }
};
exports.checkSentenceForKeyWord = checkSentenceForKeyWord;
const checkOptionalLanguage = (sentence, language) => {
    const optionalTerms = ["plus", "benefit", "useful", "optional"];
    const matches = optionalTerms.filter((optional) => {
        const optionalTermRegex = new RegExp(`\\b${language}\\b\\s(?:is|is\\sa|be|be\\sa)?\\s${optional}`, "i");
        return optionalTermRegex.test(sentence);
    });
    if (matches.length === 1)
        return { multipleMatches: false, matches };
    else if (matches.length > 1)
        return { multipleMatches: true, matches };
    else
        return null;
};
exports.checkOptionalLanguage = checkOptionalLanguage;
const createPositiveRegex = (language, positiveTerms) => {
    const positiveRegexStrings = positiveTerms.map((term) => `\\b${language}\\b(?:\\s+\\w+){0,5}\\s+\\b${term}\\b|\\b${term}\\b(?:\\s+\\w+){0,5}\\s+\\b${language}\\b`);
    return new RegExp(positiveRegexStrings.join("|"), "i");
};
exports.createPositiveRegex = createPositiveRegex;
