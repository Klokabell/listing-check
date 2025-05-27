import { languageUtilities } from "./languageUtilities";

export const extractLanguageSentences = (
  text: string,
  languageNameArray: string[]
) => {
  const languageObject: Record<string, string[]> = {};

  // extracts all sentences that have names on the list
  for (const language of languageNameArray) {
    const sentenceArray = languageUtilities.extractKeywordSentences(
      language,
      text
    );
    if (sentenceArray && sentenceArray.length > 0) {
      languageObject[language] = sentenceArray;
    }
  }
  if (Object.keys(languageObject).length === 0) return null;
  return languageObject;
};
