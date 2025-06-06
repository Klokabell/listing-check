import { runExtension } from "../runExtension";

console.log("content script loaded");
if (window.location.pathname.startsWith("/jobs/search")) {
  runExtension();
}
const handleMessage = (
  message: any,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => {
  if (message.action == "listingPageEntered") {
    runExtension();
    sendResponse({ response: "extension running" });
  } else if (message.action === "removePanel") {
    const injectedElement = document.getElementById("panel-wrapper");
    if (injectedElement) {
      injectedElement.remove();
      sendResponse({ response: "panelRemoved" });
    } else sendResponse({ response: "no panel" });
  }
};
chrome.runtime.onMessage.addListener(handleMessage);
