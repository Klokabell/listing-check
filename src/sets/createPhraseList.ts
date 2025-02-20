import { requirementTermsEnglish } from "./keyWordLists";
import {
  primaryLanguageTermRegexes,
  secondaryLanguageTermRegexes,
} from "./regexLists";

export const checkForRequirement = (sentence: string, language: string) => {
  const matches = requirementTermsEnglish.filter((requirement) => {
    const requirementTermRegex = new RegExp(
      `\\b${language}\\b\\s(?:is|is\\sa|be|be\\sa)?\\s${requirement}`,
      "i"
    );
    return requirementTermRegex.test(sentence);
  });
  if (matches.length === 1) return { multipleMatches: false, matches };
  else if (matches.length > 1) return { multipleMatches: true, matches };
  else return null;
};

export const checkSentenceForKeyWord = (
  sentence: string,
  regexTermObject: object
): string[] | null => {
  const communicationTerms = Object.keys(regexTermObject);
  const matches = communicationTerms.filter((term) => {
    const termRegex = new RegExp(term);
    return termRegex.test(sentence);
  });

  if (matches.length > 0) return matches;
  else if (regexTermObject === primaryLanguageTermRegexes) {
    return checkSentenceForKeyWord(sentence, secondaryLanguageTermRegexes);
  } else {
    return null;
  }
};

export const checkOptionalLanguage = (sentence: string, language: string) => {
  const optionalTerms: string[] = ["plus", "benefit", "useful", "optional"];

  const matches = optionalTerms.filter((optional) => {
    const optionalTermRegex = new RegExp(
      `\\b${language}\\b\\s(?:is|is\\sa|be|be\\sa)?\\s${optional}`,
      "i"
    );
    return optionalTermRegex.test(sentence);
  });
  if (matches.length === 1) return { multipleMatches: false, matches };
  else if (matches.length > 1) return { multipleMatches: true, matches };
  else return null;
};

export const createPositiveRegex = (
  language: string,
  positiveTerms: string[]
) => {
  const positiveRegexStrings = positiveTerms.map(
    (term) =>
      `\\b${language}\\b(?:\\s+\\w+){0,5}\\s+\\b${term}\\b|\\b${term}\\b(?:\\s+\\w+){0,5}\\s+\\b${language}\\b`
  );
  return new RegExp(positiveRegexStrings.join("|"), "i");
};
