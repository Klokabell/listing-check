import { languageCheck } from "./modules/languageCheck";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  sendResponse({
    success: true,
    message: "Listing text received",
  });

  if (message.action === "sendingListingText") {
    const jobDetails = message.messageBody;
    if (jobDetails) {
      const languageResult = languageCheck(jobDetails);
      console.log("languageResult:", languageResult);
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length > 0) {
          const tabId = tabs[0].id;
          if (tabId !== undefined) {
            chrome.tabs.sendMessage(tabId, {
              action: "extractedValues",
              values: languageResult,
            });
          } else console.error("No active tabs found");
        }
      });
    } else console.log("languageCheck empty");
  }
});
