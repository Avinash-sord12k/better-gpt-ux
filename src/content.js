function searchElements(query) {
  const elements = [...document.querySelectorAll(query)];
  return elements.map((el, index) => ({
    text: el.textContent.trim().substring(0, 50), // Limit text length
    index
  }));
}

function scrollToElement(index, query) {
  const elements = document.querySelectorAll(query);
  if (elements[index]) {
    elements[index].scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "searchElements") {
    sendResponse({ elements: searchElements(message.query) });
  } else if (message.action === "scrollToElement") {
    scrollToElement(message.index, message.query);
  }
});
