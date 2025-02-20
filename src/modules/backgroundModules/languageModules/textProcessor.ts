//import { checkForRequirement } from "./findLangRequirements/checkForRequirement";
import { extractLanguageSentences } from "./findLangRequirements/extractLanguageSentences";
import { filterCommunicationSentences } from "./findLangRequirements/filterCommunicationSentences";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const textProcessor = (listingText: string, _userLanguage: string) => {
  let sentencesObject;
  const filteredSentenceObject: { [language: string]: string[] } = {};
  let communicationSentences: string[] | null;
  let languages;

  //Retrieve sentences containing language names
  try {
    sentencesObject = extractLanguageSentences(listingText);
    if (!sentencesObject) {
      console.log("no language names found");
      return null;
    } else console.log("sentencesObject", sentencesObject);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`error building language names array`, error.message);
      return [];
    }
  }

  //Filter sentences referring to communication
  try {
    if (sentencesObject) {
      languages = Object.keys(sentencesObject);
      languages.forEach((language) => {
        communicationSentences = filterCommunicationSentences(
          sentencesObject[language]
        );
        if (communicationSentences && communicationSentences.length > 0) {
          filteredSentenceObject[language] = communicationSentences;
        }
      });
    }
    console.log("filteredSentenceObject: ", filteredSentenceObject);
  } catch (error) {
    console.error(error);
    return [];
  }

  // Check for requirements
/*   try {
    let reqObject: RequirementObject;
    languages?.forEach((language) => {
      if (communicationSentences) {
        reqObject = checkForRequirement(
          _userLanguage,
          filteredSentenceObject[language]
        );
      }
      if (reqObject.possible && reqObject.possible.length > 0) {
        console.log("possible matches: ", reqObject.possible);
      }
      console.log(reqObject && "reqObject", reqObject);
    });
  } catch (error) {
    console.error("error", error);
  } */
};
