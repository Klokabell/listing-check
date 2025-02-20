// @ts-expect-error // lemmatiser doesn't have a type library
import Lemmatizer from "../../lib/javascript-lemmatizer-master/js/Lemmatizer";
import { franc } from "franc";
import langs from "langs";

//import { requirementTermsEnglish } from "../sets/keyWordLists";
import {
  francLanguageListEnglish,
  francLanguageListFinnish,
} from "../data/languageSets";

const detectLanguage = (text: string): string | Error => {
  const langCode = franc(text);
  const language = langs.where("3", langCode);
  if (language) return language.name;
  else throw new Error("Language Cannot be Determined");
};

const extractSentences = (keyword: string, text: string) => {
  const regex = new RegExp(`[^.?!]*\\b${keyword}\\b[^.?!]*[.?!]`, "i");
  return text.match(regex) || null;
};

const selectLanguageNameArray = (text: string) => {
  const listingLanguage = languageUtilities.detectLanguage(text);
  let langNameArray;
  if (listingLanguage) {
    if (listingLanguage == "Finnish") return francLanguageListFinnish;
    else return francLanguageListEnglish;
  }
  return langNameArray;
};

const checkLemma = (word: string) => {
  const lemmatizer = new Lemmatizer();

  const lemma = lemmatizer.lemmas(word);
  return lemma;
};

export const languageUtilities = {
  detectLanguage,
  extractSentences,
  selectLanguageNameArray,
  checkLemma,
};
