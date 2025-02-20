/* import { detectLanguage } from "../utilities/languageUtilities";
import { createBaseLanguageObject } from "./createBaseLanguageObject";
import { filterLanguageObjectArrays } from "../modules/languageModules/filterLanguageObjectArrays";

export const findLanguageRequirements = (
  text: string,
  userLanguage: string
) => {
  const normalizedText = text.replace(/\n+/g, ".");

  const detectedLanguage = detectLanguage(normalizedText);
  const baseLangObject = createBaseLanguageObject(
    detectedLanguage,
    normalizedText,
    userLanguage
  );

  filterLanguageObjectArrays(baseLangObject, userLanguage);

  console.log("baseLangObject", baseLangObject);
};
 */ 
