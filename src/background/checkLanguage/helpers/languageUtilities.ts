import { franc } from "franc";
import langs from "langs";

import {
  francLanguageListEnglishLite,
  francLanguageListFinnishExpandedLite,
} from "../language constants/languageSetsLite";

const detectLanguage = (text: string): string => {
  const langCode = franc(text);
  const language = langs.where("3", langCode);
  if (language) return language.name;
  else throw new Error("Language Cannot be Determined");
};

const extractKeywordSentences = (keyword: string, text: string) => {
  const regex = new RegExp(`[^.?!]*\\b${keyword}\\b[^.?!]*[.?!]`, "i");
  return text.match(regex) || null;
};

const selectLanguageNameArray = (languageName: string) => {
  if (languageName == "Finnish") return francLanguageListFinnishExpandedLite;
  else return francLanguageListEnglishLite;
};

export const languageUtilities = {
  detectLanguage,
  extractKeywordSentences,
  selectLanguageNameArray,
};
