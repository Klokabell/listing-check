import {
  primaryLanguageTermRegexes,
  secondaryLanguageTermRegexes,
} from "../../../../sets/regexLists";

export const filterCommunicationSentences = (
  sentenceArray: string[]
): string[] | null => {
  //console.log("filterCommunicationSentences input: ", sentenceArray);
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
  //console.log("running primaryTermsKeys");
  communicationSentences = filterByTerm(
    sentenceArray,
    primaryTermsKeys,
    primaryLanguageTermRegexes
  );
  //console.log("communicationSentences", communicationSentences);
  if (communicationSentences.length > 0) return communicationSentences;
  else {
    //console.log("running TermsKeys");
    communicationSentences = filterByTerm(
      sentenceArray,
      secondaryTermsKeys,
      secondaryLanguageTermRegexes
    );
  }
  if (communicationSentences.length > 0) return communicationSentences;
  else return null;
};
