(async () => {
  const [{ os }, win, [tab]] = await Promise.all([
    chrome.runtime.getPlatformInfo(),
    chrome.windows.getCurrent(),
    chrome.tabs.query({ active: true, currentWindow: true }),
  ]);

  const width = await chrome.action.getBadgeText({ tabId: tab.id });
  let height;
  console.log("w", win.width, win.height);
  if (!tab.url || !tab.url.startsWith("http")) {
    height = win.height;
    if (os === "win") {
      height -= 8;
      if (win.state === "maximized" || win.state === "fullscreen") height -= 8;
    } else if (win.state === "normal") height -= 42;
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
    let delta = result.o[1] - result.i[1];
    if (delta === 70 || delta === 48 || delta === 28) height = result.i[1] + 28;
    else if (delta === 129 || delta === 107 || delta === 87) height = result.i[1] + 87;
    else if (delta === 26) height = result.i[1] + 26;
    else if (delta === 38) height = result.i[1] + 38;
    console.log("i", result.i[0], result.i[1]);
    console.log("o", result.o[0], result.o[1]);
    console.log("sa", result.sa[0], result.sa[1]);
    console.log("s", result.s[0], result.s[1]);
    console.log("dpr", result.dpr);
  }

  document.getElementById("outer-size").textContent = `${width}x${height}`;

  const sizePresets = [
    { label: "724xAny", width: 724 },
    { label: "1024xAny", width: 1024 },
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
