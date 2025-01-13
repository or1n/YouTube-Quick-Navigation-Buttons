# YouTube Quick Navigation Buttons

## Description

This UserScript adds customizable quick navigation buttons to the YouTube header, with support for dark mode, keyboard shortcuts, and a dropdown menu for additional buttons. It enhances the user experience by providing quick access to frequently used sections of YouTube.

## Features

- Customizable quick navigation buttons.
- Support for dark mode.
- Keyboard shortcuts for quick access.
- Dropdown menu for additional buttons.

## Installation

1. Install a UserScript manager extension for your browser (e.g., Violentmonkey, Tampermonkey, Greasemonkey).
2. Click on the following link to install the UserScript: [YouTube Quick Navigation Buttons](https://github.com/or1n/YouTube-Quick-Navigation-Buttons/raw/main/YouTube%20Quick%20Navigation%20Buttons.js).

## Configuration

To customize the navigation buttons, edit the `BUTTONS_CONFIG` object in the script:

```javascript
const BUTTONS_CONFIG = {
    home: { active: true, icon: 'fa-home', path: '/', title: 'Home', shortcut: 'h' },
    subscriptions: { active: true, icon: 'fa-subscript', path: '/feed/subscriptions', title: 'Subscriptions', shortcut: 's' },
    // Add more buttons as needed
};
