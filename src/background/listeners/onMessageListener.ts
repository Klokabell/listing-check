import { handleLanguageProcessing } from "../checkLanguage/handleLanguageProcessing";

export const onMessageListener = (
  request: any,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => {
  console.log("running listener");
  if (request.action === "checkLanguages") {
    const { contentText, userLanguage } = request.messageBody;

    if (contentText) {
      handleLanguageProcessing(contentText).then((result) => {
        if (result != null) sendResponse(result);
        else {
          sendResponse({
            status: "error",
            message: "language processing failed",
          });
        }
      });
    }

    if (userLanguage) {
      console.log("userLanguage: ", userLanguage);
    }

    return true;
  }

  return false;
};
