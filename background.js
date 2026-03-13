chrome.windows.onBoundsChanged.addListener(async (window) => {
  const [tab] = await chrome.tabs.query({ windowId: window.id, active: true });
  await updateBadge(tab.id, tab.url, window);
});

chrome.tabs.onActivated.addListener(async ({ tabId, windowId }) => {
  const [tab, window] = await Promise.all([chrome.tabs.get(tabId), chrome.windows.get(windowId)]);
  await updateBadge(tab.id, tab.url, window);
});

async function updateBadge(tabId, tabUrl, window) {
  const { os } = await chrome.runtime.getPlatformInfo();
  const offset = os === "win" ? 16 : 32; // "win", "mac", "linux", "android", "cros", "openbsd"
  let width;
  if (!tabUrl || !tabUrl.startsWith("http")) {
    width = window.width;
    if (window.state !== "maximized" && window.state !== "fullscreen") width -= offset;
  } else {
    const [{ result }] = await chrome.scripting.executeScript({ target: { tabId }, func: () => window.innerWidth });
    width = result;
  }
  await chrome.action.setBadgeText({ text: width.toString(), tabId });
}
