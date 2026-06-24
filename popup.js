(async () => {
  const [{ os }, win, [tab]] = await Promise.all([
    chrome.runtime.getPlatformInfo(),
    chrome.windows.getCurrent(),
    chrome.tabs.query({ active: true, currentWindow: true }),
  ]);

  const key = `tab_${tab.id}`;
  const storage = await chrome.storage.local.get([key]);
  const result = storage[key];

  const outerText = `${result.outerWidth}x${result.outerHeight}`;
  document.getElementById("outer-size").textContent = outerText;
  const innerText = `${result.innerWidth}x${result.innerHeight}`;
  document.getElementById("inner-size").textContent = innerText;

  const sizePresets = [
    // { label: "724x485", width: 724, height: 485 },
    { label: "664x485", width: 664, height: 485 },
    { label: "768xAny", width: 768 },
    { label: "960x600", width: 960, height: 600 },
    { label: "1280x800", width: 1280, height: 800 },
    { label: "1440x900", width: 1440, height: 900 },
    { label: "1536x960", width: 1536, height: 960 },
    { label: "1920x1200", width: 1920, height: 1200 },
  ];

  const container = document.getElementById("buttons");
  sizePresets.forEach(({ label, width, height }) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.addEventListener("click", () => {
      chrome.windows.update(win.id, {
        width: width + (os === "win" ? 16 : 32),
        ...(height && { height: height + (os === "win" ? 8 : 42) }),
      });
    });
    container.appendChild(btn);
  });
})();
