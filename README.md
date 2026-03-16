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

Debian 13 KDE:

- Width:
  - regular, floating/snapped: 0.
  - special:
    - floating: 0.
    - snapped: howbigismybrowser-12(-12).
- Height:
  - regular, floating/snapped: 0.
  - special:
    - floating: 0.
    - snapped: howbigismybrowser+65(-22).

Windows 11:

- Width: regular/special, floating/snapped: Snipping Tool-2 .
- Height: regular/special, floating/snapped: Snipping Tool-1.

```
floating:
true 960x540 => display 960x540 => 960 992 453 582
width=inner=outer-32, height=inner+87=outer-42
snapped:
true 960x540 => display 960x518 => 960 980 453 560
width=inner=outer-20, height=inner+87=outer-20


floating: inner+129=outer
snapped: inner+107=outer

960x599 => 582 512 70 floating
540=582-42=512+28

960x599 => 560 512 48 snapped
540=560-20=512+28


960x540 => 582 453 129 floating
540=582-42=453+87

960x540 => 560 453 107 snapped
540=560-20=453+87

KDE app gap height: 28
KDE normal gap height: 87

Windows app gap height: 26
```
