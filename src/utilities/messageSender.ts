export const messageSender = async (
  contentText: string,
  userLanguage: string
) => {
  const maxRetries = 3;
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`Retrying message send... attempt ${attempt + 1}`);
        await delay(100); // Wait 100ms before retrying
      }

      console.log("sending message");
      const response = await chrome.runtime.sendMessage({
        action: "checkLanguages",
        messageBody: { contentText, userLanguage },
      });

      if (response) {
        return response;
      } else {
        console.warn("No response from service worker");
      }
    } catch (error) {
      console.error("Error in messageSender:", error);
    }
  }

  console.error("All attempts to contact service worker failed");
  return null;
};
