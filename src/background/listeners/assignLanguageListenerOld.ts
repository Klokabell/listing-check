/* import { handleLanguageProcessing } from "../checkLanguage/handleLanguageProcessing";
async function onMessageHandler() {
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action === "checkLanguages") {
      const { contentText, userLanguage } = request.messageBody;

      if (contentText) {
        handleLanguageProcessing(contentText).then((result) => {
          if (result != null) sendResponse(result);
          else
            sendResponse({
              status: "error",
              message: "language processing failed",
            });
        });
      }

      if (userLanguage) {
        console.log("userLanguage: ", userLanguage);
      }
      return true; //keeps the listener open for lifetime
    }
    return false;
  });
}
export function assignLanguageListener() {
  console.log("adding onMessage listener");
  chrome.runtime.onMessage.addListener(onMessageHandler);
}
 */