export const handleURLChange = async (
  details: chrome.webNavigation.WebNavigationTransitionCallbackDetails
) => {
  const url = details.url;
  const targetDomain = "https://www.linkedin.com/jobs/search";
  const targetDomain2 = "https://www.linkedin.com/jobs/collections";
  const maxRetries = 5;
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  if (url.startsWith(targetDomain) || url.startsWith(targetDomain2)) {
    console.log("user looking at job listing");

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          console.log(`Retrying message send... attempt ${attempt + 1}`);
          await delay(250); // Wait 100ms before retrying
        }
        const response = await chrome.tabs.sendMessage(details.tabId, {
          action: "listingPageEntered",
          url: url,
        });
        if (response) {
          return response;
        } else {
          console.warn("No response from content script");
        }
      } catch (error) {
        console.error("Error in handleURLChange: ", error);
      }
    }
  }
  console.log("All attempts to contact content script failed");
  return null;
};
