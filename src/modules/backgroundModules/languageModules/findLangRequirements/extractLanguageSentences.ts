import { languageUtilities } from "../../../../utilities/languageUtilities";

export const extractLanguageSentences = (text: string) => {
  let languageNameArray;
  const languageObject: Record<string, string[]> = {};

  //determines which language name list to use
  try {
    languageNameArray = languageUtilities.selectLanguageNameArray(text);
  } catch (error) {
    if (error instanceof Error)
      if (error.message == "Language Cannot be Determined") {
        return null;
      } else throw error;
  }

  // extracts all sentences that have names on the list
  if (!languageNameArray) return null;
  for (const language of languageNameArray) {
    const sentenceArray = languageUtilities.extractSentences(language, text);
    if (sentenceArray && sentenceArray.length > 0) {
      languageObject[language] = sentenceArray;
    }
  }
  if (Object.keys(languageObject).length === 0) return null;
  return languageObject;
};
