chrome.windows.onBoundsChanged.addListener(async (win) => {
  const [tab] = await chrome.tabs.query({ windowId: win.id, active: true });
  await updateBadge(tab, win);
});

chrome.tabs.onActivated.addListener(async ({ tabId, windowId }) => {
  const [tab, win] = await Promise.all([chrome.tabs.get(tabId), chrome.windows.get(windowId)]);
  await updateBadge(tab, win);
});

async function updateBadge(tab, win) {
  const { os } = await chrome.runtime.getPlatformInfo();
  let width;
  console.log("win.width", win.width, "win.height", win.height);
  if (!tab.url || !tab.url.startsWith("http")) {
    width = win.width;
    if (os === "win") {
      if (win.state === "normal" || win.state === "maximized") width -= 16;
    } else if (win.state === "normal") width -= 32;
  } else {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => ({ oW: window.outerWidth, oH: window.outerHeight, iW: window.innerWidth, iH: window.innerHeight }),
    });
    width = result.iW;
    console.log("outerWidth", result.oW, "outerHeight", result.oH);
    console.log("innerWidth", result.iW, "innerHeight", result.iH);
  }
  await chrome.action.setBadgeText({ text: width.toString(), tabId: tab.id });
}
