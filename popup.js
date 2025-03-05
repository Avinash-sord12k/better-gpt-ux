document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getH2Elements
  }, (result) => {
    const h2List = result[0].result;
    const ul = document.getElementById("h2-list");
    ul.innerHTML = ""; 

    if (h2List.length === 0) {
      ul.innerHTML = "<li>No H2 elements found</li>";
      return;
    }

    h2List.forEach(({ text, index }) => {
      const li = document.createElement("li");
      li.textContent = text;
      li.addEventListener("click", () => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: scrollToH2,
          args: [index]
        });
      });
      ul.appendChild(li);
    });
  });
});

function getH2Elements() {
  return [...document.querySelectorAll("h2")].map((h2, index) => ({
    text: h2.textContent.trim(),
    index
  }));
}

function scrollToH2(index) {
  const h2Elements = document.querySelectorAll("h2");
  if (h2Elements[index]) {
    h2Elements[index].scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
