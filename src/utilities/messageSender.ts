export const messageSender = async (
  contentText: string,
  userLanguage: string
) => {
  try {
    console.log("sending message to service worker");
    const response = await chrome.runtime.sendMessage({
      action: "sendingListingText",
      messageBody: { contentText, userLanguage },
    });
    if (response) {
      console.log("background received listingText");
    } else console.log("No response from the service-worker");
  } catch (error) {
    console.error("Aw, went wrong in the messageSender", error);
  }
};
