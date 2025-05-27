export const handleURLChange = (
  details: chrome.webNavigation.WebNavigationTransitionCallbackDetails
) => {
  const url = details.url;

  if (url.startsWith("https://www.linkedin.com/jobs/search")) {
    console.log("user looking at job listing");

    chrome.tabs.sendMessage(details.tabId, {
      type: "listingPageEntered",
      url: url,
    });
  }
};
