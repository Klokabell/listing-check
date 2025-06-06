export const handleMessageRetry = async (
  tabId: number,
  message: any,
  maxRetries = 3,
  delayMs = 250
) => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) await new Promise((res) => setTimeout(res, delayMs));
      const response = await chrome.tabs.sendMessage(tabId, message);
      return response;
    } catch (err) {
      if (attempt === maxRetries) {
        console.error("Failed to send message after retries:", err);
        throw err;
      }
    }
  }
};
