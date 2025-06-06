import { handleMessageRetry } from "../../sharedUtilities/handleMessageRetry";

export function assignTabChangeListener() {
  const targetDomain = "https://www.linkedin.com/jobs/search";
  const targetDomain2 = "https://www.linkedin.com/jobs/collections/recommended";
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && tab.url) {
      if (
        tab.url.startsWith(targetDomain) ||
        tab.url.startsWith(targetDomain2)
      ) {
        chrome.tabs.get(tabId, async (updatedTab) => {
          if (updatedTab.status === "complete") {
            try {
              await handleMessageRetry(tabId, {
                type: "listingPageEntered",
                url: updatedTab.url,
              });
            } catch (err) {
              console.warn(
                "Could not message content script on job listing enter"
              );
            }
          }
        });
      } else {
        handleMessageRetry(tabId, { action: "removePanel" }).catch(() => {
          console.warn("Could not message content script to remove panel");
        });
      }
    }
  });
}
