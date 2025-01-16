import { createRoot } from "react-dom/client";
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "displayResults")
    console.log("message received from service worker", request);
  sendResponse({
    success: true,
    message: "language text received",
  });
});
export const Popup = () => {
  return (
    <>
      <h1>Job Listing Summary</h1>
      <div className="bodyContainer"></div>
    </>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(<Popup />);
