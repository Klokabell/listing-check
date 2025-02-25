import { textProcessor } from "./modules/backgroundModules/languageModules/textProcessor";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  sendResponse({
    success: true,
    message: "Listing text received",
  });
  console.log("background received message", message);
  if (message.action === "sendingListingText") {
    const { contentText, userLanguage } = message.messageBody;

    if (contentText) {
      const languageResult = textProcessor(contentText, userLanguage);

      if (languageResult) {
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
      }
    } else console.log("languageCheck empty");
  }
  return true;
});
