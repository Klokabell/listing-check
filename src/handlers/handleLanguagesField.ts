import { messageSender } from "../utilities/messageSender";
import { createStringElement, insertElement } from "../rendering/renderHelpers";
import { createListElement } from "../rendering/createListElement";
import { extractingListingText } from "../helpers/extractingListingText";
import { accordionFields } from "../sharedData/stateObjects";

export const handleLanguagesField = async (
  element: Element,
  isRendered: { [key: string]: boolean }
) => {
  let langElementString;
  if (element == null) return;

  // take & format listing source text
  const languageSourceText = extractingListingText(element);

  if (languageSourceText) {
    // send text to service worker for processing
    const responseObject = await messageSender(languageSourceText, "english");
    if (responseObject.status == "error") {
      accordionFields.languages = false;
      const noLanguageElement = createStringElement(
        responseObject.message,
        "languages"
      );
      const langElement = document.querySelector("#languages_container");

      if (langElement)
        langElement.insertAdjacentHTML("beforeend", noLanguageElement);
      return;
    }

    const languageObject = responseObject.message;
    const languageFieldArray = Object.keys(responseObject.message);
    const languageElement = languageFieldArray
      .map((languageName) => {
        if (responseObject.status == "partial") {
          languageName = "Potentially " + languageName;
        }
        accordionFields.languages = true;
        return createListElement(
          "languages",
          languageName,
          languageObject[languageName]
        );
      })
      .join("");
    if (languageElement) {
      langElementString = `
        <div class="accordion_container" id="languageAccordion">
          ${languageElement}
        </div>
      `;
      insertElement("languages", langElementString);
      isRendered.languages = true;
    }
  }
};
