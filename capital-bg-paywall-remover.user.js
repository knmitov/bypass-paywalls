// ==UserScript==
// @name         Capital.bg Paywall Remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Capital.bg Paywall Remover
// @author       Kiril Mitov
// @match        https://www.capital.bg/*
// @updateURL    https://github.com/knmitov/capital-bg-paywall-remover/raw/main/capital-bg-paywall-remover.user.js
// @downloadURL  https://github.com/knmitov/capital-bg-paywall-remover/raw/main/capital-bg-paywall-remover.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Remove the div with id "poool-widget"
    function removePooolWidget() {
        const pooolWidget = document.getElementById('poool-widget');
        if (pooolWidget) {
            pooolWidget.remove();
        }
    }

    // Remove style tag of the div with classes "content poool-banner"
    function setPooolBannerHeight() {
        const pooolBanner = document.querySelector('.content.poool-banner');
        if (pooolBanner) {
            pooolBanner.removeAttribute('style');
        }
    }

    // Initial execution of functions
    removePooolWidget();
    setPooolBannerHeight();

    // Observe DOM changes and reapply styles
    const observer = new MutationObserver(function(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                removePooolWidget();
                setPooolBannerHeight();
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
