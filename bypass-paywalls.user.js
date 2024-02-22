// ==UserScript==
// @name         Bypass Paywalls
// @namespace    https://github.com/knmitov/bypass-paywalls/
// @version      0.3
// @description  Bypass Paywalls
// @author       Kiril Mitov
// @match        https://www.capital.bg/*
// @updateURL    https://github.com/knmitov/bypass-paywalls/raw/main/bypass-paywalls.user.js
// @downloadURL  https://github.com/knmitov/bypass-paywalls/raw/main/bypass-paywalls.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const domainActions = [
        {
            domain: 'capital.bg',
            action: () => {
                const removePaywallElements = () => {
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
            }
        },
        // {
        //   domain: 'example.com',
        //   action: () => {
        //     // ...
        //   }
        // },
    ];

    // Find matching domain-specific logic and execute it
    const currentDomain = window.location.hostname;
    const currentAction = domainActions.find(action => currentDomain.includes(action.domain));

    if (currentAction) {
        currentAction.action();
    }

})();

