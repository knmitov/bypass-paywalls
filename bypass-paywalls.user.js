// ==UserScript==
// @name         Bypass Paywalls
// @description  Bypass Paywalls
// @author       Kiril Mitov (https://github.com/knmitov)
// @namespace    https://github.com/knmitov/bypass-paywalls/
// @supportURL   https://github.com/knmitov/bypass-paywalls/issues
// @updateURL    https://github.com/knmitov/bypass-paywalls/raw/main/bypass-paywalls.user.js
// @downloadURL  https://github.com/knmitov/bypass-paywalls/raw/main/bypass-paywalls.user.js
// @run-at       document-end
// @version      0.1.0
// @match        *://*.capital.bg/*
// ==/UserScript==

(function () {
    'use strict';

    const domainActions = [
        {
            domain: 'capital.bg',
            action: () => {
                new MutationObserver((mutations, observer) => {
                    for (const mutation of mutations) {
                        for (const node of mutation.addedNodes) {
                            if (node.matches('.p3-advanced-paywall')) {
                                document.querySelector('.poool-banner')?.removeAttribute('style');
                                node.remove();

                                observer.disconnect();

                                break;
                            }
                        }
                    }
                }).observe(document.body, {childList: true, subtree: true});
            }
        }
    ];

    const currentDomain = window.location.hostname;
    const currentAction = domainActions.find(value => currentDomain.includes(value.domain));

    if (currentAction) {
        currentAction.action();
    }
})();

