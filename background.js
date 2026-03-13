chrome.windows.onBoundsChanged.addListener(async (win) => {
  const [tab] = await chrome.tabs.query({ windowId: win.id, active: true });
  await updateBadge(tab.id, tab.url, win);
});

chrome.tabs.onActivated.addListener(async ({ tabId, windowId }) => {
  const [tab, win] = await Promise.all([chrome.tabs.get(tabId), chrome.windows.get(windowId)]);
  await updateBadge(tab.id, tab.url, win);
});

async function updateBadge(tabId, tabUrl, win) {
  const { os } = await chrome.runtime.getPlatformInfo();
  const offset = os === "win" ? 16 : 32; // "win", "mac", "linux", "android", "cros", "openbsd"
  let width;
  if (!tabUrl || !tabUrl.startsWith("http")) {
    width = win.width;
    if (win.state !== "maximized" && win.state !== "fullscreen") width -= offset;
  } else {
    const [{ result }] = await chrome.scripting.executeScript({ target: { tabId }, func: () => window.innerWidth });
    width = result;
  }
  await chrome.action.setBadgeText({ text: width.toString(), tabId });
}
