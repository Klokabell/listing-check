import { DisplayResultsProps } from "./types/types";
import { messageSender } from "./utilities/messageSender";
import { renderDisplay } from "./utilities/renderDisplay";
import { extractingListingText } from "./utilities/extractingListingText";

const companyNameSelector = ".job-details-jobs-unified-top-card__company-name";
const jobTitleSelector =
  ".job-details-jobs-unified-top-card__container--two-pane h1";
const locationSelector =
  ".job-details-jobs-unified-top-card__primary-description-container > div > span:nth-child(1)";

const resultsObject: DisplayResultsProps = {
  company: "",
  title: "",
  languages: { language: "", examples: [""] },
  location: "",
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "extractedValues") {
    if (message.values) {
      sendResponse({ result: "positive" });
      resultsObject.languages = message.values;

      console.log("resultsObject:", resultsObject);
      let container = document.getElementById("my-extension-data");
      if (!container) {
        console.log("creating container");
        container = document.createElement("div");
        container.id = "my-extension-data";
        document.body.appendChild(container);
      }
      container.innerHTML = renderDisplay(resultsObject);
    }
  }
});

const observer = new MutationObserver(function (_mutationlist) {
  let listingElement;
  const companyDiv = document.querySelector(companyNameSelector);
  const jobTitle = document.querySelector(jobTitleSelector);
  const locationElement = document.querySelector(locationSelector);
  const listingElementsArray = document.getElementsByClassName(
    "jobs-details__main-content jobs-details__main-content--single-pane full-width"
  );

  //check if component contains elements
  if (listingElementsArray.length > 0) {
    for (const mutation of _mutationlist) {
      if (mutation.type === "characterData") {
        listingElement = document.getElementById("job-details");

        const userLanguage = "English";

        //create string from listing text
        const listingText = extractingListingText(listingElement);

        //check values exist and send textObject to background script
        if (companyDiv && listingText && jobTitle && locationElement) {
          const location = locationElement.textContent?.trim();

          resultsObject.company =
            companyDiv?.querySelector("a")?.innerText || "";
          resultsObject.title = jobTitle?.querySelector("a")?.innerText || "";
          resultsObject.location = location ? location : "unknown";

          messageSender(listingText, userLanguage);
        } else {
          console.log("resultsObject", resultsObject);
        }
      }
    }
  } else {
    console.log("no listing component found");
  }
});
observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: true,
});
