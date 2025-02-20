/* import {
  francLanguageListEnglish,
  francLanguageListFinnish,
} from "../data/languageSets";
import { extractSentences } from "../utilities/languageUtilities";
import { communicationTerms } from "../sets/createPhraseList";

export const createBaseLanguageObject = (
  detectedLanguage: string,
  text: string,
  primaryLanguage: string
): Record<string, string[]> => {
  const languageObject: Record<string, string[]> = {};
  console.log("primaryLanguage", primaryLanguage);

  const languageList =
    detectedLanguage == "Finnish"
      ? francLanguageListFinnish
      : francLanguageListEnglish;

  for (const language of languageList) {
    const langSentenceArray = extractSentences(language, text);
    if (langSentenceArray && langSentenceArray.length > 0) {
      const communicationSentencesPrimary = langSentenceArray.filter(
        (sentence) =>
          communicationTerms.some((term) => {
            const regex = new RegExp(`\\b${term}\\b`, "i");
            return regex.test(sentence);
          })
      );

      if (communicationSentencesPrimary.length > 0) {
        languageObject[language] = communicationSentencesPrimary;
        console.log("communication sentences: ", communicationSentencesPrimary);
      }
    }
    if (Object.keys(languageObject).length >= 4) {
      break;
    }
  }
  return languageObject;
};
 */ 
