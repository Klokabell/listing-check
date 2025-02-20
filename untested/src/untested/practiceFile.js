"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error  // Suppress the "could not find declaration file" error
const Lemmatizer_1 = require("../../lib/javascript-lemmatizer-master/js/Lemmatizer");
//import { requirementTermsEnglish } from "../sets/keyWordLists";
const checkLemma = () => {
    const lemmatizer = new Lemmatizer_1.default();
    const lemma = lemmatizer.lemmas("requirement");
    console.log("lemma", lemma);
};
checkLemma();
