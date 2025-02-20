"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.negativeTermsEnglish = exports.createPhraseList = exports.basePhrasesRegex = exports.baseTermsFinnish = exports.createNegativeRegex = exports.createPositiveRegex = exports.checkOptionalLanguage = exports.checkRequiredLanguages = exports.communicationTerms = void 0;
exports.communicationTerms = [
    "speak",
    "spoken",
    "talk",
    "converse",
    "communicate",
    "communication",
    "communicating",
    "verbal",
    "oral",
    "listen",
    "listening",
    "hear",
    "heard",
    "write",
    "written",
    "read",
    "reading",
    "comprehend",
    "comprehension",
    "translate",
    "translation",
    "interpret",
    "interpretation",
    "fluent",
    "fluency",
    "proficient",
    "proficiency",
    "language",
    "linguistic",
    "communicate in",
];
const checkRequiredLanguages = (sentence, language) => {
    const requirementTermsEnglish = [
        "required",
        "requires",
        "necessary",
        "essential",
        "must",
        "needed",
        "prerequisite",
    ];
    const matches = requirementTermsEnglish.filter((requirement) => {
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
exports.checkRequiredLanguages = checkRequiredLanguages;
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
const createNegativeRegex = (language) => {
    const negativeRegexStrings = exports.negativeTermsEnglish.map((term) => `\\b${language}\\b.*\\b${term}\\b|\\b${term}\\b.*\\b${language}\\b`);
    return new RegExp(negativeRegexStrings.join("|"), "i"); // Case-insensitive
};
exports.createNegativeRegex = createNegativeRegex;
exports.baseTermsFinnish = [
    "sujuva", // fluent
    "puhuttu", // spoken
    "puhua", // speak
    "lukea", // read
    "kirjoittaa", // write
    "kirjallinen", // written
    "viestintä", // communication
    "suullinen", // verbal
    "sujuvuus", // fluency
    "äidinkieli", // native
    "viestiminen", // communicating
    "kieli", // language
    "kielitaito", // language proficiency
    "tulkkaus", // interpreting
    "ymmärtäminen", // understanding
    "kuunteleminen", // listening
    "ilmaisu", // expression
    "vuorovaikutus", // interaction
    "keskustelu", // conversation
    "dialogi", // dialogue
    "kirjoitustaito", // writing skill
    "lukutaito", // literacy
    "artikulaatio", // articulation
    "ääntäminen", // pronunciation
    "oppiminen", // learning
    "kommunikaatiotaidot", // communication skills
    "kulttuurinen ymmärrys", // cultural understanding
];
exports.basePhrasesRegex = [
    /communication skill(s)?/,
    /language skill(s)?/,
    /language proficien(cy|t)/,
    /spoken (and|&)? written/,
    /written (and|&)? verbal/,
    /fluen(cy|t)/,
    /command of/,
    /ability to communicate/,
    /proficient in/,
    /strong understanding of/,
    /working proficiency/,
    /high level of/,
    /demonstrated proficiency/,
    /communicate (fluently)? in/,
    /good /,
];
const createPhraseList = (languageName) => {
    const language = `\\b${languageName}\\b`;
    const basePhrases = [
        `Must be fluent in ${language}`,
        `Excellent ${language} communication skills required`,
        `spoken(?: and written)? ${language}`,
        `Must have(?: strong)? ${language} language skills`,
        `Requires (?:excellent)? written and verbal ${language} skills`,
        `Fluency in ${language} is essential`,
        `Native (?:or near-native)? ${language} proficiency`,
        `Must be comfortable communicating in ${language}`,
        `${language} as a working language`,
        `Business-level ${language} required`,
        `Must be able to communicate (?:effectively)? in ${language}`,
        `Strong command of the ${language} language`,
        `Must possess (?:excellent)? ${language} communication skills`,
        `Requires (?:strong)? ${language} language proficiency`,
        `Must be able to read, write, and speak ${language} (?:fluently)?`,
        `Excellent command of written and spoken ${language}`,
        `Must have a good command of ${language}`,
        `Working proficiency in ${language} is required`,
        `Must be proficient in both written and oral ${language}`,
        `Must be able to communicate clearly and concisely in ${language}`,
        `Requires the ability to communicate effectively in ${language}`,
        `Must have a strong understanding of the ${language} language`,
        `${language} language proficiency is a must`,
        `Must have excellent written and oral communication skills in ${language}`,
        `Must be able to conduct business in ${language}`,
        `Must be comfortable working in an ${language}-speaking environment`,
        `${language} language skills are essential for this role`,
        `Must have the ability to communicate effectively with ${language}-speaking clients`,
        `Requires a high level of ${language} proficiency`,
        `Must be able to present information clearly in ${language}`,
        `Must be able to understand (?:and respond to complex information in)? ${language}`,
        `Must be able to write (?:clear and concise reports in)? ${language}`,
        `Must be able to participate (?: actively)? in meetings conducted in ${language}`,
        `Must be comfortable giving presentations in ${language}`,
        `Must be able to negotiate effectively in ${language}`,
        `Requires (?:excellent interpersonal and )?communication skills in ${language}`,
        `Must possess excellent communication skills with a focus on ${language}`,
        `Must demonstrate excellent ${language} communication skills`,
        `Must have demonstrated proficiency in ${language}`,
        `Requires demonstrated proficiency in ${language}`,
        `Must provide proof of ${language} proficiency (e.g., TOEFL, IELTS)`,
        `${language} language testing may be required`,
        `Must be willing to improve ${language} language skills if necessary`,
        `Must be able to work with ${language}-language documentation`,
        `Requires familiarity with ${language} business terminology`,
    ];
    return basePhrases;
};
exports.createPhraseList = createPhraseList;
exports.negativeTermsEnglish = [
    "not required",
    "not necessary",
    "unnecessary",
    "unneeded",
    "no need for",
    "lack of",
    "without",
];
