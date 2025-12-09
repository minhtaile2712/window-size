const offset = 16;

chrome.windows.getCurrent(
  (w) => (document.getElementById("size").textContent = `${w.width - offset}x${w.height - offset}`)
);

const sizePresets = [
  { label: "724xAny", width: 724 },
  { label: "1024xAny", width: 1024 },
  { label: "800x960", width: 800, height: 960 },
  { label: "960x600", width: 960, height: 600 },
  { label: "1280x800", width: 1280, height: 800 },
  { label: "1440x900", width: 1440, height: 900 },
  { label: "1536x960", width: 1536, height: 960 },
  { label: "1920x1200", width: 1920, height: 1200 },
];

const container = document.getElementById("buttons");

sizePresets.forEach((preset) => {
  const btn = document.createElement("button");
  btn.textContent = preset.label;
  btn.addEventListener("click", () => setWindowSize(preset.width, preset.height));
  container.appendChild(btn);
});

async function setWindowSize(width, height) {
  const win = await chrome.windows.getCurrent();
  const updateInfo = { width: width + offset };
  if (height) updateInfo.height = height + offset;
  chrome.windows.update(win.id, updateInfo);
}
