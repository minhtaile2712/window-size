# Window Size

This extension is used to view/set Chrome window's size.

## Installation

- Clone this repo.
- In Chrome, go to `chrome://extensions`.
- On top-right of the window, enable `Developer mode`.
- On top-left of the window, select `Load unpacked`.
- Select the project folder.

## Tips

- You can pin the extension for easier access.
- You don't need to run `npm install` for using this extension. It's only useful for development.
- When needing to modify, you can reload the extension based on what you changed. See [when to reload the extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#when_to_reload_the_extension).

## Project status

GET on Debian 13 KDE:

- Width:
  - floating, regular: 0.
  - floating, special: 0.
  - snapped, regular: 0.
  - snapped, special: -12.
- Height:
  - floating, regular: 0.
  - floating, special: 0.
  - snapped, regular: -22.
  - snapped, special: -22.

SET on Debian 13 KDE: Width: 0, Height: 0.

GET on Windows 11:

- Width:
  - floating/snapped, regular:
    -2 compared to Snipping Tool,
    0 compared to howbigismybrowser.
  - floating/snapped, special:
    -2 compared to Snipping Tool,
    0 compared to howbigismybrowser.
- Height:
  - floating/snapped, regular:
    -1 compared to Snipping Tool,
    +87 compared to howbigismybrowser.
  - floating/snapped, special:
    -1 compared to Snipping Tool,
    +87 compared to howbigismybrowser.

SET on Windows 11: Width: 0, Height: 0.
