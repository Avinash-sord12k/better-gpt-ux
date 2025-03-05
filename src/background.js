chrome.runtime.onInstalled.addListener(() => {
  console.log("H2 Scroller extension installed.");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"]
    });
  }
});