import { assignHistoryUpdateListener } from "./listeners/assignHistoryUpdateListener";
import { onMessageListener } from "./listeners/onMessageListener";
import { assignTabChangeListener } from "./listeners/assignTabChangeListener";

assignHistoryUpdateListener();
if (!chrome.runtime.onMessage.hasListener(onMessageListener)) {
  console.log("no listener found");
  chrome.runtime.onMessage.addListener(onMessageListener);
}
assignTabChangeListener();

console.log("Background script setup complete, listeners assigned");
