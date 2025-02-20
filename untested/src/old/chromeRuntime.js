"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getElementText_1 = require("./getElementText");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "getText") {
        console.log(`text retrieval request made from ${sender.id}`);
        let response;
        try {
            response = (0, getElementText_1.getElementText)(request.attributeType);
            sendResponse({ response });
        }
        catch (err) {
            if (err instanceof Error) {
                console.error("Error Occurred", err.message);
            }
            else {
                console.error("Somehow an unexpected error occurred, we never planned for this.");
            }
        }
    }
});
