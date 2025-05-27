import {
  primaryLanguageTermRegexes,
  secondaryLanguageTermRegexes,
} from "../language constants/regexLists";

export const filterCommunicationSentences = (
  sentenceArray: string[]
): string[] | null => {
  const primaryTermsKeys = Object.keys(primaryLanguageTermRegexes);
  const secondaryTermsKeys = Object.keys(secondaryLanguageTermRegexes);
  let communicationSentences;

  const filterByTerm = (
    sentenceArray: string[],
    termKey: string[],
    regexList: Record<string, RegExp>
  ) => {
    const communicationSentences: string[] | false = sentenceArray.filter(
      (sentence) => {
        const matchedSentences = termKey.some((term: string) => {
          const cleanedSentence = sentence.replace(/\n/g, "");
          const regex = regexList[term];

          if (regex) {
            return regex.test(cleanedSentence);
          }
          return false;
        });
        return matchedSentences;
      }
    );
    return communicationSentences;
  };
  communicationSentences = filterByTerm(
    sentenceArray,
    primaryTermsKeys,
    primaryLanguageTermRegexes
  );
  if (communicationSentences.length > 0) return communicationSentences;
  else {
    communicationSentences = filterByTerm(
      sentenceArray,
      secondaryTermsKeys,
      secondaryLanguageTermRegexes
    );
  }
  if (communicationSentences.length > 0) return communicationSentences;
  else return null;
};
