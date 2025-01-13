# YouTube Quick Navigation Buttons

## Description

This UserScript adds customizable quick navigation buttons to the YouTube header, with support for dark mode, keyboard shortcuts, and a dropdown menu for additional buttons. It enhances the user experience by providing quick access to frequently used sections of YouTube.

## Features

- Customizable quick navigation buttons.
- Support for dark mode.
- Keyboard shortcuts for quick access (with ALT key).
- Dropdown menu for additional buttons.
- Visual feedback on button hover and click.
- Configurable option to enable or disable shortcuts.

## Installation

1. Install a UserScript manager extension for your browser (e.g., Violentmonkey, Tampermonkey, Greasemonkey).
2. Click on the following link to install the UserScript: [YouTube Quick Navigation Buttons](https://github.com/or1n/YouTube-Quick-Navigation-Buttons/raw/main/YouTube%20Quick%20Navigation%20Buttons.js).

## Configuration

To customize the navigation buttons, edit the `BUTTONS_CONFIG` object in the script:

```javascript
const BUTTONS_CONFIG = {
    home: { active: true, icon: 'home', path: '/', title: 'Home', shortcut: 'h' },
    subscriptions: { active: true, icon: 'subscriptions', path: '/feed/subscriptions', title: 'Subscriptions', shortcut: 's' },
    history: { active: true, icon: 'history', path: '/feed/history', title: 'History', shortcut: 'y' },
    playlists: { active: true, icon: 'playlist_play', path: '/feed/playlists', title: 'Playlists', shortcut: 'p' },
    library: { active: true, icon: 'video_library', path: '/feed/library', title: 'Library', shortcut: 'l' },
    watchLater: { active: true, icon: 'watch_later', path: '/playlist?list=WL', title: 'Watch Later', shortcut: 'w' },
    likedVideos: { active: true, icon: 'thumb_up', path: '/playlist?list=LL', title: 'Liked Videos', shortcut: 'v' },
    trending: { active: true, icon: 'trending_up', path: '/feed/trending', title: 'Trending', shortcut: 't' }
};
```

### Button Configuration

- `active`: Set to `true` to display the button, `false` to hide it.
- `icon`: The icon name from Material Icons to display on the button.
- `path`: The URL path to navigate to when the button is clicked.
- `title`: The tooltip text to display when hovering over the button.
- `shortcut`: The single key shortcut (with ALT key) to navigate to the URL.

### General Configuration

To enable or disable keyboard shortcuts, set the `ENABLE_SHORTCUTS` constant in the script:

```javascript
const ENABLE_SHORTCUTS = true; // Set to false to disable shortcuts
```

### Visual Configuration

You can also customize the visual appearance of the buttons by modifying the following constants:

```javascript
const BUTTON_MARGIN = '8px'; // Margin around each button
const BUTTON_SIZE = '23px'; // Size of each button
const BUTTON_COLOR_LIGHT = '#FFFFFF'; // Button color in light mode
const BUTTON_COLOR_DARK = '#909090'; // Button color in dark mode
const BUTTON_HOVER_COLOR = '#ff0000'; // Button color on hover
const BUTTON_CLICK_COLOR = '#00ff00'; // Button color on click
const BUTTON_FONT_FAMILY = '"Roboto", sans-serif'; // Font family for button text
const BUTTON_FONT_WEIGHT = '500'; // Font weight for button text
const MAX_BUTTONS = 3; // Maximum number of buttons to display before showing the dropdown
const DROPDOWN_BUTTON_ICON = 'expand_more'; // Icon for the dropdown button
const DROPDOWN_MIN_WIDTH = '160px'; // Minimum width of the dropdown menu
const DROPDOWN_BACKGROUND_COLOR_LIGHT = '#FFFFFF'; // Dropdown background color in light mode
const DROPDOWN_BACKGROUND_COLOR_DARK = '#181818'; // Dropdown background color in dark mode
const DROPDOWN_Z_INDEX = 1; // Z-index of the dropdown menu
const INITIAL_SETUP_DELAY = 1000; // Initial setup delay in milliseconds
const DROPDOWN_BUTTON_FONT_SIZE = '10px'; // Font size for the dropdown button
const DROPDOWN_BUTTON_MARGIN = '0px'; // Margin for the dropdown button
```
