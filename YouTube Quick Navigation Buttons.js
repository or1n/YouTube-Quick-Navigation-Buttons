// ==UserScript==
// @name         YouTube Quick Navigation Buttons
// @namespace    https://github.com/or1n/YouTube-Quick-Navigation-Buttons
// @version      1.3
// @description  Adds customizable quick navigation buttons to the YouTube header, with support for dark mode, keyboard shortcuts, and a dropdown menu for additional buttons.
// @author       https://github.com/or1n
// @license      MIT
// @homepage     https://github.com/or1n/YouTube-Quick-Navigation-Buttons
// @supportURL   https://github.com/or1n/YouTube-Quick-Navigation-Buttons/issues
// @updateURL    https://github.com/or1n/YouTube-Quick-Navigation-Buttons/raw/main/YouTube%20Quick%20Navigation%20Buttons.js
// @downloadURL  https://github.com/or1n/YouTube-Quick-Navigation-Buttons/raw/main/YouTube%20Quick%20Navigation%20Buttons.js
// @match        *://*.youtube.com/*
// @match        http://*.youtube.com/*
// @match        http://youtube.com/*
// @match        https://*.youtube.com/*
// @match        https://youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Inject Material Icons CSS
    const materialIconsLink = document.createElement('link');
    materialIconsLink.rel = 'stylesheet';
    materialIconsLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    document.head.appendChild(materialIconsLink);

    // Configuration constants
    const BUTTONS_CONFIG = {
        home: { active: true, icon: 'home', path: '/', title: 'Home', shortcut: 'ha' },
        subscriptions: { active: true, icon: 'subscriptions', path: '/feed/subscriptions', title: 'Subscriptions', shortcut: 's' },
        history: { active: true, icon: 'history', path: '/feed/history', title: 'History', shortcut: 'y' },
        playlists: { active: true, icon: 'playlist_play', path: '/feed/playlists', title: 'Playlists', shortcut: 'p' },
        library: { active: true, icon: 'video_library', path: '/feed/library', title: 'Library', shortcut: 'l' },
        watchLater: { active: true, icon: 'watch_later', path: '/playlist?list=WL', title: 'Watch Later', shortcut: 'w' },
        likedVideos: { active: true, icon: 'thumb_up', path: '/playlist?list=LL', title: 'Liked Videos', shortcut: 'v' },
        trending: { active: true, icon: 'trending_up', path: '/feed/trending', title: 'Trending', shortcut: 't' }
    };

    const BUTTON_MARGIN = '8px';
    const BUTTON_SIZE = '23px';
    const BUTTON_COLOR_LIGHT = '#FFFFFF';
    const BUTTON_COLOR_DARK = '#909090';
    const BUTTON_HOVER_COLOR = '#ff0000'; // Change color on hover
    const BUTTON_CLICK_COLOR = '#00ff00'; // Change color on click
    const BUTTON_FONT_FAMILY = '"Roboto", sans-serif';
    const BUTTON_FONT_WEIGHT = '500';
    const MAX_BUTTONS = 3;
    const DROPDOWN_BUTTON_ICON = 'expand_more'; // Use a downward arrow icon for the dropdown button
    const DROPDOWN_MIN_WIDTH = '160px';
    const DROPDOWN_BACKGROUND_COLOR_LIGHT = '#FFFFFF';
    const DROPDOWN_BACKGROUND_COLOR_DARK = '#181818';
    const DROPDOWN_Z_INDEX = 1;
    const INITIAL_SETUP_DELAY = 1000;
    const DROPDOWN_BUTTON_FONT_SIZE = '10px';
    const DROPDOWN_BUTTON_MARGIN = '0px'; // Add a constant margin for the dropdown button
    const ENABLE_SHORTCUTS = true; // Add a constant to enable or disable shortcuts

    function isDarkMode() {
        return document.documentElement.getAttribute('dark') !== null;
    }

    function getCurrentYouTubeDomain() {
        return window.location.origin;
    }

    function createNavButton(icon, path, title, shortcut) {
        const button = document.createElement('a');
        button.href = `${getCurrentYouTubeDomain()}${path}`;
        button.title = ENABLE_SHORTCUTS ? `${title} (ALT+${shortcut.toUpperCase()})` : title;
        button.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: ${BUTTON_SIZE};
            height: ${BUTTON_SIZE};
            margin: ${BUTTON_MARGIN};
            color: ${isDarkMode() ? BUTTON_COLOR_DARK : BUTTON_COLOR_LIGHT};
            text-decoration: none;
            font-family: ${BUTTON_FONT_FAMILY};
            font-weight: ${BUTTON_FONT_WEIGHT};
            cursor: pointer;
            user-select: none;
            transition: color 0.2s, transform 0.2s;
        `;

        const iconElement = document.createElement('span');
        iconElement.className = 'material-icons';
        iconElement.textContent = icon;
        iconElement.style.cssText = `
            font-size: ${BUTTON_SIZE}; /* Ensure icon size matches button size */
            height: ${BUTTON_SIZE};
        `;
        button.appendChild(iconElement);

        button.addEventListener('mouseenter', () => {
            button.style.color = BUTTON_HOVER_COLOR;
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.color = isDarkMode() ? BUTTON_COLOR_DARK : BUTTON_COLOR_LIGHT;
            button.style.transform = 'scale(1)';
        });

        button.addEventListener('click', (e) => {
            e.preventDefault();
            button.style.color = BUTTON_CLICK_COLOR;
            setTimeout(() => {
                window.location.href = button.href;
            }, 200);
        });

        // Add keyboard shortcut
        if (ENABLE_SHORTCUTS) {
            document.addEventListener('keydown', (e) => {
                if (e.altKey && e.key.toLowerCase() === shortcut && !['INPUT', 'TEXTAREA', 'DIV'].includes(document.activeElement.tagName) && !document.activeElement.isContentEditable) {
                    window.location.href = button.href;
                }
            });
        }

        return button;
    }

    function addNavigationButtons() {
        const ytLogo = document.querySelector('#start ytd-logo');
        if (ytLogo) {
            ytLogo.remove();
        }

        const countryText = document.querySelector('#country-code');
        if (countryText) {
            countryText.remove();
        }

        if (document.querySelector('#custom-yt-nav-buttons')) return;

        const startContainer = document.querySelector('#start');
        if (!startContainer) return;

        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'custom-yt-nav-buttons';
        buttonContainer.style.cssText = `
            display: inline-flex;
            align-items: center;
            height: 100%;
            margin-left: 8px;
        `;

        const dropdownContainer = document.createElement('div');
        dropdownContainer.style.cssText = `
            position: relative;
            display: inline-block;
            margin-left: ${DROPDOWN_BUTTON_MARGIN}; /* Apply the margin */
        `;

        const dropdownButton = document.createElement('button');
        dropdownButton.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: ${BUTTON_SIZE};
            height: ${BUTTON_SIZE};
            margin: ${BUTTON_MARGIN};
            color: ${isDarkMode() ? BUTTON_COLOR_DARK : BUTTON_COLOR_LIGHT};
            background: none;
            border: none;
            cursor: pointer;
            font-family: ${BUTTON_FONT_FAMILY};
            font-size: ${DROPDOWN_BUTTON_FONT_SIZE};
            font-weight: ${BUTTON_FONT_WEIGHT};
            transition: color 0.2s, transform 0.2s;
        `;

        const dropdownIcon = document.createElement('span');
        dropdownIcon.className = 'material-icons';
        dropdownIcon.textContent = DROPDOWN_BUTTON_ICON;
        dropdownButton.appendChild(dropdownIcon);

        dropdownButton.addEventListener('mouseenter', () => {
            if (dropdownContent.style.display !== 'block') {
                dropdownButton.style.color = BUTTON_HOVER_COLOR;
                dropdownButton.style.transform = 'scale(1.1)';
            }
        });

        dropdownButton.addEventListener('mouseleave', () => {
            if (dropdownContent.style.display !== 'block') {
                dropdownButton.style.color = isDarkMode() ? BUTTON_COLOR_DARK : BUTTON_COLOR_LIGHT;
                dropdownButton.style.transform = 'scale(1)';
            }
        });

        dropdownButton.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownButton.style.color = BUTTON_CLICK_COLOR;
            setTimeout(() => {
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                    dropdownButton.style.color = isDarkMode() ? BUTTON_COLOR_DARK : BUTTON_COLOR_LIGHT;
                } else {
                    dropdownContent.style.display = 'block';
                    dropdownButton.style.color = BUTTON_HOVER_COLOR;
                }
            }, 200);
        });

        const dropdownContent = document.createElement('div');
        dropdownContent.style.cssText = `
            display: none;
            position: absolute;
            background-color: ${isDarkMode() ? DROPDOWN_BACKGROUND_COLOR_DARK : DROPDOWN_BACKGROUND_COLOR_LIGHT};
            min-width: ${DROPDOWN_MIN_WIDTH};
            z-index: ${DROPDOWN_Z_INDEX + 1}; /* Ensure the dropdown is above other elements */
            white-space: nowrap;
            top: 100%; /* Position the dropdown below the button */
            left: 0;
        `;

        dropdownContainer.appendChild(dropdownButton);
        dropdownContainer.appendChild(dropdownContent);

        let buttonCount = 0;

        // Create and add all buttons
        Object.values(BUTTONS_CONFIG).forEach(({ icon, path, title, active, shortcut }) => {
            if (active) {
                const button = createNavButton(icon, path, title, shortcut);
                if (buttonCount < MAX_BUTTONS) {
                    buttonContainer.appendChild(button);
                } else {
                    dropdownContent.appendChild(button);
                }
                buttonCount++;
            }
        });

        if (buttonCount > MAX_BUTTONS) {
            buttonContainer.appendChild(dropdownContainer);
        }

        const burgerMenuIcon = document.querySelector('#guide-button');
        if (burgerMenuIcon) {
            burgerMenuIcon.parentNode.insertBefore(buttonContainer, burgerMenuIcon.nextSibling);
        } else {
            startContainer.appendChild(buttonContainer);
        }
    }

    // Initial setup with delay to ensure YouTube's UI is loaded
    setTimeout(addNavigationButtons, INITIAL_SETUP_DELAY);

    // Handle navigation changes (for single-page application)
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                const existingButtons = document.querySelector('#custom-yt-nav-buttons');

                if (!existingButtons) {
                    addNavigationButtons();
                }
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();