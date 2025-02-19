const offset = 16;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.windows.get(tabs[0].windowId, (window) => {
    document.getElementById("windowWidth").textContent = window.width - offset;
    document.getElementById("windowHeight").textContent = window.height - offset;
  });
});

const windowSizes = {
  "800x960": { width: 800, height: 960 },
  "960x960": { width: 960, height: 960 },
  "1280x720": { width: 1280, height: 720 },
  "1280x800": { width: 1280, height: 800 },
  "1280x960": { width: 1280, height: 960 },
  "1280x1024": { width: 1280, height: 1024 },
  "1920x1080": { width: 1920, height: 1080 },
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
