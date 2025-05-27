import { handleURLChange } from "../handleURLChange";

export function assignHistoryUpdateListener() {
  chrome.webNavigation.onHistoryStateUpdated.addListener(
    (details) => handleURLChange(details),
    {
      url: [{ hostContains: "linkedin.com" }],
    }
  );
}
