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
  let width;
  if (!tabUrl || !tabUrl.startsWith("http")) {
    width = win.width;
    if (os === "win") {
      if (win.state === "normal" || win.state === "maximized") width -= 16;
    } else if (win.state === "normal") width -= 32;
    // console.log("special", win.state, win.width, width);
  } else {
    const [{ result }] = await chrome.scripting.executeScript({ target: { tabId }, func: () => window.innerWidth });
    width = result;
    // console.log("regular", win.state, win.width, width);
  }
  await chrome.action.setBadgeText({ text: width.toString(), tabId });
}
