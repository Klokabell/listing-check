import { runExtension } from "./runExtension";

console.log("content script loaded");
if (window.location.pathname.startsWith("/jobs/search")) {
  runExtension();
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type == "listingPageEntered") {
    runExtension();
  } else if (message.action === "removePanel") {
    const injectedElement = document.getElementById("panel_container");
    if (injectedElement) {
      injectedElement.remove();
    }
  }
});
