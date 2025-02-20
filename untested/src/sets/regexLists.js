"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basePhrasesRegex = exports.secondaryLanguageTermRegexes = exports.primaryLanguageTermRegexes = void 0;
exports.primaryLanguageTermRegexes = {
    fluent: /\s*fluen(t|tly|cy)\s*/i,
    native: /native|near-native/,
    language: /language(s|d|ing)?/,
    speak: /speak(ing|s|spoke|n)?/,
    understand: /understand(ing|s|able)?/,
    write: /writ(ing|es|ten)?/,
    proficiency: /proficient(ly)?|proficiency/,
    communicate: /communicat(ion|ing|e(s)?)?/,
    comprehend: /comprehen(ding|ds|sion)?/,
    listen: /listen(ing|ed|s)?/,
    read: /read(ing|s|able)?/,
    required: /required|requires|necessary|essential|must|needed|prerequisite/,
};
exports.secondaryLanguageTermRegexes = {
    ability: /abilit(y|ies)/,
    active: /active(ly)?/,
    businessLevel: /business\s+level/,
    clear: /clear(ly)?/,
    comfort: /comfortabl(e|y)/,
    command: /command(ed|ing)?/,
    effective: /effective(ly|ness)?/,
    excellent: /excellent(ly)?/,
    grasp: /grasp/,
    interpreted: /interpret(ation|ed|ing|s)?/,
    participate: /participate(ing|s|d)?|participation/,
    speakClearly: /speak\s+clearly/,
    strong: /strong|strength/,
    skilled: /skill(s|ed)?/,
    translated: /translat(e|ed|ing|s)?/,
    writtenAndOral: /written\s+and\s+oral/,
};
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
