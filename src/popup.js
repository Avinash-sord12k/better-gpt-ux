document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-query").value.trim();
    if (!query) return;

    // Send query to content script
    chrome.tabs.sendMessage(tab.id, { action: "searchElements", query }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }

      const elements = response?.elements || [];
      const ul = document.getElementById("elements-list");
      ul.innerHTML = "";

      if (elements.length === 0) {
        ul.innerHTML = "<li>No elements found</li>";
        return;
      }

      elements.forEach(({ text, index }) => {
        const li = document.createElement("li");
        li.textContent = text || "[No Text Content]";
        li.addEventListener("click", () => {
          chrome.tabs.sendMessage(tab.id, { action: "scrollToElement", index, query });
        });
        ul.appendChild(li);
      });
    });
  });
});
