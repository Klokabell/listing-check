import { checkKeyWords } from "./checkKeyWords";

export const languageCheck = (detailsText: string) => {
  const normalizedText = detailsText.replace(/\n+/g, ".");
  const splitText = normalizedText.split(/[.!?]\s*/).filter(Boolean);
  if (splitText.length > 0) {
    const languageArray = splitText.filter((sentence: string) =>
      checkKeyWords(sentence)
    );
    if (languageArray.length > 0) {
      console.log(languageArray);
      return languageArray;
    }
  }
  return "No language determined"; // Default return
};
