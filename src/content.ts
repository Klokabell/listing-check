//import ReactDOM from "react-dom/client";
import { messageSender } from "./utilities/messageSender";
import { renderDisplay } from "./utilities/renderDisplay";
import { DisplayResultsProps } from "./types/types";
const resultsObject: DisplayResultsProps = {
  company: "",
  title: "",
  languages: { language: "", examples: [""] },
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

const jobTitleSelector =
  ".job-details-jobs-unified-top-card__container--two-pane h1";
const companyNameSelector = ".job-details-jobs-unified-top-card__company-name";

const observer = new MutationObserver(function (_mutationlist) {
  let listingElement;
  const companyDiv = document.querySelector(companyNameSelector);
  const jobTitle = document.querySelector(jobTitleSelector);
  const listingElementsArray = document.getElementsByClassName(
    "jobs-details__main-content jobs-details__main-content--single-pane full-width"
  );
  if (listingElementsArray.length > 0) {
    for (const mutation of _mutationlist) {
      if (mutation.type === "characterData") {
        listingElement = document.getElementById("job-details");

        const listingText = listingElement?.innerText || "";

        if (companyDiv && listingText && jobTitle) {
          resultsObject.company =
            companyDiv?.querySelector("a")?.innerText || "";
          resultsObject.title = jobTitle?.querySelector("a")?.innerText || "";
          messageSender(listingText);
        } else {
          console.log("companyDiv: ", companyDiv);
          console.log("jobTitle: ", jobTitle);
          console.log("listingText: ", listingText);
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
