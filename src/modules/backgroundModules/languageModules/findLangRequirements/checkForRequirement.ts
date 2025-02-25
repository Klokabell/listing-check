import { languageUtilities } from "../../../../utilities/languageUtilities";
import { requirementTermsEnglish } from "../../../../sets/keyWordLists";
import { RequirementObject } from "../../../../types/types";
export const checkForRequirement = (
  languageName: string,
  sentenceArray: string[]
): RequirementObject => {
  const requirementObject: RequirementObject = {
    matches: [],
  };
  sentenceArray.forEach((sentence) => {
    const words = sentence.split(/\s+/);
    for (const word of words) {
      if (word.length < 4 || word === languageName) {
        continue;
      }
      const lemma = languageUtilities.checkLemma(word); // check lemmatisation list
      if (lemma) {
        lemma.forEach((lem: string[]) => {
          if (requirementTermsEnglish.some((term) => term === lem[0]))
            requirementObject.matches.push(sentence);
        });
      }
    }
  });

  if (requirementObject.matches.length === 0) {
    // sends this to a new "possible" field
    sentenceArray.forEach((sentence) => {
      requirementObject.possible = [];
      const backupRegex = new RegExp(
        `\\b${languageName}\\b\\s+is|is\\s+\\b${languageName}\\b`,
        "i"
      );
      const possibleMatch = backupRegex.test(sentence);
      if (possibleMatch) requirementObject.possible.push(sentence);
    });
  }
  if (requirementObject.possible?.length === 0)
    delete requirementObject.possible;
  return requirementObject;
};
