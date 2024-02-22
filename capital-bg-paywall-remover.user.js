// ==UserScript==
// @name         Capital.bg Paywall Remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Capital.bg Paywall Remover
// @author       Kiril Mitov
// @match        https://www.capital.bg/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=capital.bg
// @updateURL    https://github.com/knmitov/capital-bg-paywall-remover/raw/main/capital-bg-paywall-remover.user.js
// @downloadURL  https://github.com/knmitov/capital-bg-paywall-remover/raw/main/capital-bg-paywall-remover.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removePaywallElements() {
        const pooolWidget = document.getElementById('poool-widget');
        if (pooolWidget) {
            pooolWidget.remove();
        }

        const pooolBanner = document.querySelector('.content.poool-banner');
        if (pooolBanner) {
            pooolBanner.removeAttribute('style');
        }
    }

    // Initial execution
    removePaywallElements();

    // Observe DOM changes
    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                removePaywallElements();
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();

