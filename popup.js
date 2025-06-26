const offset = 16;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.windows.get(tabs[0].windowId, (window) => {
    document.getElementById("windowWidth").textContent = window.width - offset;
    document.getElementById("windowHeight").textContent = window.height - offset;
  });
});

const windowSizes = {
  "800x960": { width: 800, height: 960 },
  "960x600": { width: 960, height: 600 },
  "1280x800": { width: 1280, height: 800 },
  "1440x900": { width: 1440, height: 900 },
  "1536x960": { width: 1536, height: 960 },
  "1920x1200": { width: 1920, height: 1200 },
};

document.getElementById("size-select").addEventListener("change", (event) => {
  if (event.target.value == "current") return;

  chrome.windows.getCurrent((window) => {
    chrome.windows.update(window.id, {
      width: windowSizes[event.target.value].width + offset,
      height: windowSizes[event.target.value].height + offset,
    });
  });
});
