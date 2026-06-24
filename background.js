chrome.runtime.onInstalled.addListener(async () => {
  console.log("Extension installed/reloaded!");

  const tabs = await chrome.tabs.query({ active: true });
  for (const tab of tabs) {
    const win = await chrome.windows.get(tab.windowId);
    await updateBadge(tab, win);
  }
});

chrome.tabs.onActivated.addListener(async ({ tabId, windowId }) => {
  console.log("Tab activated!");

  const [tab, win] = await Promise.all([chrome.tabs.get(tabId), chrome.windows.get(windowId)]);
  await updateBadge(tab, win);
});

chrome.windows.onBoundsChanged.addListener(async (win) => {
  console.log("Tab resized!");

  const [tab] = await chrome.tabs.query({
    active: true,
    windowId: win.id,
  });
  await updateBadge(tab, win);
});

chrome.tabs.onUpdated.addListener(async (_tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    console.log("Tab updating completed!");

    const win = await chrome.windows.get(tab.windowId);
    await updateBadge(tab, win);
  }
});

async function updateBadge(tab, win) {
  console.log("chrome.windows.Window.type %c%s", "color: red", win.type); // 'normal', 'app'
  console.log("chrome.windows.Window.width", win.width);
  console.log("chrome.windows.Window.height", win.height);

  let data = {
    isNormalSite: !!tab.url?.startsWith("http"),
  };
  if (data.isNormalSite)
    data = {
      ...data,
      ...(await executeScript()),
    };

  const { os } = await chrome.runtime.getPlatformInfo();

  if (data.isNormalSite) {
    innerWidth = result["window.innerWidth"];
    innerHeight = result["window.innerHeight"];

    if (os === "win") {
      if (win.state === "normal") {
        outerWidth = result["window.outerWidth"] - 16;
        outerHeight = result["window.outerHeight"] - 8;
        if (result["window.devicePixelRatio"] != 1) {
          outerWidth += 2;
        }
      } else if (win.state === "maximized") {
        outerWidth = result["window.outerWidth"];
        outerHeight = result["window.outerHeight"];
        if (result["window.devicePixelRatio"] != 1) {
          outerWidth -= 2;
          outerHeight -= 2;
        }
      }
    } else {
      if (win.state === "normal") {
        outerWidth = result["window.outerWidth"];
        outerHeight = result["window.outerHeight"];
      } else if (win.state === "maximized") {
        outerWidth = result["window.outerWidth"];
        outerHeight = result["window.outerHeight"];
      }
    }
  } else {
    if (os === "win") {
      if (win.state === "normal") {
        outerWidth = win.width - 16;
        outerHeight = win.height - 8;
        innerWidth = win.width - 16;
        innerHeight = win.height - 95;
      } else if (win.state === "maximized") {
        outerWidth = win.width - 16;
        outerHeight = win.height - 16;
        innerWidth = win.width - 16;
        innerHeight = win.height - 103;
      }
    } else {
      if (win.state === "normal") {
        outerWidth = win.width;
        outerHeight = win.height;
        innerWidth = win.width;
        innerHeight = win.height;
      } else if (win.state === "maximized") {
        outerWidth = win.width;
        outerHeight = win.height;
        innerWidth = win.width;
        innerHeight = win.height;
      }
    }
  }

  await chrome.storage.local.set({
    [`tab_${tab.id}`]: {
      outerWidth,
      outerHeight,
      innerWidth,
      innerHeight,
      ...(result || {}),
    },
  });

  await chrome.action.setBadgeText({ text: innerWidth.toString(), tabId: tab.id });
}

// https://developer.chrome.com/docs/extensions/reference/api/scripting
async function executeScript(tabId) {
  return (
    await chrome.scripting.executeScript({
      target: { tabId },
      func: () => ({
        "window.outerWidth": window.outerWidth,
        "window.outerHeight": window.outerHeight,
        "window.innerWidth": window.innerWidth,
        "window.innerHeight": window.innerHeight,
        "window.screen.width": window.screen.width,
        "window.screen.height": window.screen.height,
        "window.screen.availWidth": window.screen.availWidth,
        "window.screen.availHeight": window.screen.availHeight,
        "window.devicePixelRatio": window.devicePixelRatio,
      }),
    })
  )[0].result;
}
