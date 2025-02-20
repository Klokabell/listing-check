"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popup = void 0;
const client_1 = require("react-dom/client");
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action === "displayResults")
        console.log("message received from service worker", request);
    sendResponse({
        success: true,
        message: "language text received",
    });
});
const Popup = () => {
    return (<>
      <h1>Job Listing Summary</h1>
      <div className="bodyContainer"></div>
    </>);
};
exports.Popup = Popup;
const rootElement = document.getElementById("root");
const root = (0, client_1.createRoot)(rootElement);
root.render(<exports.Popup />);
