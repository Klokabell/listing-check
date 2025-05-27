import { OutputMap, SentenceMap } from "../../../types/types";

export const mergeDuplicateSentences = (languageObject: SentenceMap) => {
  const sentenceLanguageMap = new Map<string, Set<string>>();
  //this switches language: sentences[] to a map of sentence: languages[]

  //destructures the object into an array of the properties
  for (const [langName, sentences] of Object.entries(languageObject)) {
    //goes through the sentences array
    for (const sentence of sentences) {
      //checks for sentence on the Map
      if (!sentenceLanguageMap.has(sentence)) {
        //if none, adds sentence as key with empty set as value
        sentenceLanguageMap.set(sentence, new Set());
      }
      //use the sentence key to add the langName to the set value
      sentenceLanguageMap.get(sentence)!.add(langName);
    }
  }
  const output: OutputMap = {};

  for (const [sentence, languagesSet] of sentenceLanguageMap.entries()) {
    const languageArray = Array.from(languagesSet).sort();
    const key = languageArray.join("_");

    if (!output[key]) output[key] = [];
    output[key].push(sentence);
  }
  return output;
};
