import { extractLanguageSentences } from "./helpers/extractLanguageSentences";
import { filterCommunicationSentences } from "./helpers/filterCommunicationSentences";
import { mergeDuplicateSentences } from "./helpers/mergeDuplicateSentences";
import { languageUtilities } from "./helpers/languageUtilities";

export const handleLanguageProcessing = async (listingText: string) => {
  console.log("running language processing");
  let langSentencesObject;
  const filteredSentenceObject: { [language: string]: string[] } | string = {};
  let communicationSentences: string[] | null;
  let languages;
  const { detectLanguage, selectLanguageNameArray } = languageUtilities;

  //Retrieve sentences containing language names
  try {
    let languageNameArray;
    const languageName = detectLanguage(listingText);
    if (!languageName)
      return {
        status: "error",
        message: "Unable to determine source language",
      };
    if (languageName != "English")
      return {
        status: "error",
        message: `${languageName} text not currently supported`,
      };

    languageNameArray = selectLanguageNameArray(languageName);

    langSentencesObject = extractLanguageSentences(
      listingText,
      languageNameArray
    );
    if (!langSentencesObject)
      return {
        status: "error",
        message: `${languageName} likely`,
      };
  } catch (error) {
    if (error instanceof Error) {
      console.error(`error building language names array`, error.message);
      return {
        status: "error",
        message: error.message,
      };
    }
  }

  //Filter sentences referring to communication
  try {
    if (langSentencesObject) {
      languages = Object.keys(langSentencesObject);
      languages.forEach((language) => {
        communicationSentences = filterCommunicationSentences(
          langSentencesObject[language]
        );
        if (communicationSentences != null) {
          filteredSentenceObject[language] = communicationSentences;
        } else
          return {
            status: "partial",
            message: langSentencesObject,
          };
      });
    }
    if (filteredSentenceObject) {
      const processedLanguageObject = mergeDuplicateSentences(
        filteredSentenceObject
      );
      return {
        status: "success",
        message: processedLanguageObject,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        message: error.message,
      };
    }
  }
};
