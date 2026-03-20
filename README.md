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
KDE 200% bookmarks bar height: 34

Windows fullscreen app gap height: 26
Windows normal/floating app gap height: 38








Windows taskbar height: 48

regular url, normal window, floating, scale 1
w 976 608
i 960 513
o 976 608
sa 1280 976
s 1280 1024
real width = 962 = iw+2 = ow-14 = ww-14, ww-iw=16
real height = 600 = ih+87 = oh-8 = wh-8, wh-ih=95

special url, normal window, floating, scale 1
w 976 608
real width = 962 = ww-14
real height = 600 = wh-8

regular url, app window, floating, scale 1
w 976 608
i 960 566
o 976 608
sa 1280 976
s 1280 1024
real width = 962 = iw+2 = ow-14 = ww-14, ww-iw=16
real height = 600 = ih+34 = oh-8 = wh-8, wh-ih=42

regular url, normal window, snapped, scale 1
w 654 983
i 638 888
o 654 983
sa 1280 976
s 1280 1024
real width = 640 = iw+2 = ow-14 = ww-14, ww-iw=16
real height = 976 = ih+88 = ow-7 = wh-7, wh-ih=95

special url, normal window, snapped, scale 1
w 654 983
real width = 640 = ww-14
real height = 976 = wh-7

regular url, app window, snapped, scale 1
w 654 983
i 638 941
o 654 983
sa 1280 976
s 1280 1024
real width = 640 = iw+2 = ow-14 = ww-14, ww-iw=16
real height = 976 = ih+35 = ow-7 = wh-7, wh-ih=42

regular url, normal window, fullscreen, scale 1
w 1296 992
i 1280 889
o 1270 966
sa 1280 976
s 1280 1024
real width = 1280 = iw = ow+10 = ww-16
real height = 976 = ih+87 = oh+10 = wh-16

special url, normal window, fullscreen, scale 1
w 1296 992
real width = 1280 = ww-16
real height = 976 = wh-16

regular url, app window, fullscreen, scale 1
w 1296 992
i 1280 950
o 1270 966
sa 1280 976
s 1280 1024
real width = 1280 = iw = ow+10 = ww-16
real height = 976 = ih+26 = oh+10 = wh-16




regular url, normal window, floating, scale 2
w 976 608
i 963 515
o 976 608
sa 1920 1032
s 1920 1080
real width = 965 = iw+2 = ow-11 = ww-11, ww-iw=13
real height = 602 = ih+87 = oh-6 = wh-6, wh-ih=93

special url, normal window, floating, scale 2
w 976 608
real width = 965 = ww-11
real height = 602 = wh-6

regular url, app window, floating, scale 2
w 977 608
i 963 570
o 977 608
sa 1920 1032
s 1920 1080
real width = 965 = iw+2 = ow-12 = ww-12, ww-iw=14
real height = 602 = ih+32 = oh-6 = wh-6, wh-ih=38

regular url, normal window, snapped, scale 2
w 972 1038
background.js:52 i 958 944
background.js:53 o 972 1038
background.js:54 sa 1920 1032
background.js:55 s 1920 1080

special url, normal window, snapped, scale 2
w 972 1038

regular url, app window, snapped, scale 2
w 972 1038
background.js:52 i 958 999
background.js:53 o 972 1038
background.js:54 sa 1920 1032
background.js:55 s 1920 1080

regular url, normal window, fullscreen, scale 2
special url, normal window, fullscreen, scale 2
regular url, app window, fullscreen, scale 2
```
