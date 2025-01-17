import { checkKeyWords } from "./checkKeyWords";
import { franc } from "franc";
import langs from "langs";
import { francLanguageList } from "../data/languageSets";

export const languageCheck = (detailsText: string) => {
  const normalizedText = detailsText.replace(/\n+/g, ".");
  const splitText = normalizedText.split(/[.!?]\s*/).filter(Boolean);

  const detectLanguage = (text: string): string => {
    const langCode = franc(text);
    const language = langs.where("3", langCode);
    return language ? language.name : "Unknown";
  };

  const languageExamples = (splitText: string[]): string[] => {
    if (splitText.length > 0) {
      const languageArray = splitText.filter((sentence: string) =>
        checkKeyWords(sentence)
      );
      if (languageArray.length > 0) {
        console.log(languageArray);
        return languageArray;
      }
    }
    return ["None"];
  };

  const secondLangRegexCheck = (secondLang: string, sentence: string) => {
    const regex = new RegExp(
      `\\b(and ${secondLang}|${secondLang} and)\\b`,
      "i"
    );
    return regex.test(sentence);
  };

  const matchedSentences = languageExamples(splitText);

  const multiLangCheck = (sentenceArray: string[], langArray: string[]) => {
    const result = {
      languages: new Set<string>(),
      examples: [] as string[],
    };

    sentenceArray.forEach((sentence) => {
      const matchedLanguages = langArray.filter((lang) =>
        secondLangRegexCheck(lang, sentence)
      );
      if (matchedLanguages.length > 0) {
        result.examples.push(sentence);
        matchedLanguages.forEach((match) => result.languages.add(match));
      }
    });
    return {
      languages: Array.from(result.languages),
      examples: result.examples,
    };
  };

  const languageObject = multiLangCheck(matchedSentences, francLanguageList);

  const detectedLanguage = detectLanguage(normalizedText);
  const langObject: {
    language: string;
    examples: string[];
    otherLanguages: string[] | null;
  } = {
    language: detectedLanguage,
    examples: languageExamples(splitText),
  };
  return langObject;
};

//if languageArray then quote, if not then "Possibly detectedLanguage"
