export function assignTabChangeListener() {
  const targetDomain = "https://www.linkedin.com/jobs/search";

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && tab.url) {
      if (tab.url.startsWith(targetDomain)) {
        chrome.tabs.get(tabId, (updatedTab) => {
          if (updatedTab.status === "complete") {
            chrome.tabs.sendMessage(tabId, {
              type: "listingPageEntered",
              url: updatedTab.url,
            });
          } else {
            chrome.tabs.onUpdated.addListener(function waitForReady(id, info) {
              if (id === tabId && info.status === "complete") {
                chrome.tabs.onUpdated.removeListener(waitForReady);
                chrome.tabs.sendMessage(tabId, {
                  type: "listingPageEntered",
                  url: updatedTab.url,
                });
              }
            });
          }
        });
      } else {
        chrome.tabs.sendMessage(tabId, {
          action: "removePanel",
        });
      }
    }
  });
}
