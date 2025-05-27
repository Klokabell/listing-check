import { extractLanguageSentences } from "../background/checkLanguage/helpers/extractLanguageSentences";
import { filterCommunicationSentences } from "../background/checkLanguage/helpers/filterCommunicationSentences";
import { mergeDuplicateSentences } from "../background/checkLanguage/helpers/mergeDuplicateSentences";
import { francLanguageListEnglishLite } from "../background/checkLanguage/language constants/languageSetsLite";
export const handleLanguageProcessing = (listingText: string) => {
  let sentencesObject;
  const filteredSentenceObject: { [language: string]: string[] } | string = {};
  let communicationSentences: string[] | null;
  let languages;

  //Retrieve sentences containing language names
  try {
    sentencesObject = extractLanguageSentences(
      listingText,
      francLanguageListEnglishLite
    );
    if (!sentencesObject) return "No language statements detected";
    else if (sentencesObject === "Finnish") {
      return "Likely Finnish";
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`error building language names array`, error.message);
      return [];
    }
  }

  //Filter sentences referring to communication
  try {
    if (sentencesObject) {
      languages = Object.keys(sentencesObject);
      languages.forEach((language) => {
        communicationSentences = filterCommunicationSentences(
          sentencesObject[language]
        );
        if (communicationSentences && communicationSentences.length > 0) {
          filteredSentenceObject[language] = communicationSentences;
        }
      });
    }
    if (filteredSentenceObject) {
      const mergedSentences = mergeDuplicateSentences(filteredSentenceObject);
      return mergedSentences;
    }
    return filteredSentenceObject;
  } catch (error) {
    console.error(error);
    return null;
  }
};
