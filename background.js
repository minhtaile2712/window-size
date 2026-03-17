chrome.runtime.onInstalled.addListener(async () => {
  console.log("extension installed/updated");
  const tabs = await chrome.tabs.query({ active: true });
  for (const tab of tabs) {
    const win = await chrome.windows.get(tab.windowId);
    await updateBadge(tab, win);
  }
});

chrome.tabs.onActivated.addListener(async ({ tabId, windowId }) => {
  console.log("tab activated");
  const [tab, win] = await Promise.all([chrome.tabs.get(tabId), chrome.windows.get(windowId)]);
  await updateBadge(tab, win);
});

chrome.tabs.onUpdated.addListener(async (_tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    console.log("tab updated complete");
    const win = await chrome.windows.get(tab.windowId);
    await updateBadge(tab, win);
  }
});

chrome.windows.onBoundsChanged.addListener(async (win) => {
  console.log("tab resized");
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await updateBadge(tab, win);
});

async function updateBadge(tab, win) {
  const { os } = await chrome.runtime.getPlatformInfo();
  let width;
  console.log("type", win.type); // normal/app
  console.log("w", win.width, win.height);
  if (!tab.url || !tab.url.startsWith("http")) {
    width = win.width;
    if (os === "win") {
      if (win.state === "normal" || win.state === "maximized") width -= 16;
    } else if (win.state === "normal") width -= 32;
  } else {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => ({
        i: [window.innerWidth, window.innerHeight],
        o: [window.outerWidth, window.outerHeight],
        sa: [window.screen.availWidth, window.screen.availHeight],
        s: [window.screen.width, window.screen.height],
        dpr: window.devicePixelRatio,
      }),
    });
    width = result.i[0];
    console.log("i", result.i[0], result.i[1]);
    console.log("o", result.o[0], result.o[1]);
    console.log("sa", result.sa[0], result.sa[1]);
    console.log("s", result.s[0], result.s[1]);
    console.log("dpr", result.dpr);
  }
  await chrome.action.setBadgeText({ text: width.toString(), tabId: tab.id });
}
