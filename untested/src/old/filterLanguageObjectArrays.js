/* import { createNegativeRegex } from "../sets/createPhraseList";
import { RegexObject } from "../types/types";
export const filterLanguageObjectArrays = (
  langObject: Record<string, string[]>,
  primaryLanguage: string
) => {
  const negativeObject: RegexObject = {};
  const languageNames = Object.keys(langObject);

  console.log("primaryLanguage", primaryLanguage);

  languageNames.forEach((language) => {
    negativeObject[language] = createNegativeRegex(language);
  });

  const matchedNegativeTerms = languageNames.map((language) => {
    const negativeSentenceArray = langObject[language].filter((sentence) => {
      negativeObject[language].test(sentence);
    });
    return negativeSentenceArray;
  });
  console.log("negativeObject", negativeObject);
  console.log("matchedNegativeTerms", matchedNegativeTerms);
};
 */ 
