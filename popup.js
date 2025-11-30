const offset = 16;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.windows.get(tabs[0].windowId, (window) => {
    document.getElementById("windowWidth").textContent = window.width - offset;
    document.getElementById("windowHeight").textContent = window.height - offset;
  });
});

const windowSizes = {
  "724x*": { width: 724 },
  "1024x*": { width: 1024 },
  "800x960": { width: 800, height: 960 },
  "960x600": { width: 960, height: 600 },
  "1280x800": { width: 1280, height: 800 },
  "1440x900": { width: 1440, height: 900 },
  "1536x960": { width: 1536, height: 960 },
  "1920x1200": { width: 1920, height: 1200 },
};

document.getElementById("size-select").addEventListener("change", async (event) => {
  if (event.target.value == "current") return;

  const windowSize = windowSizes[event.target.value];

  const window = await chrome.windows.getCurrent();

  const updateInfo = { width: windowSize.width + offset };
  if (windowSize.height) updateInfo.height = windowSize.height + offset;

  chrome.windows.update(window.id, updateInfo);
});
