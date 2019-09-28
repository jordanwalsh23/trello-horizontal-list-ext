// ==UserScript==
// @name         Trello-Horizontal-Plugin
// @namespace    http://www.heyshmu.com/
// @version      0.1
// @description  Converts Trello to a horizontal view
// @author       Jordan Walsh (info@heyshmu.com)
// @match        https://trello.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle('#board { overflow-y: scroll !important; }');

    GM_addStyle('.list-wrapper { display: block !important; width: 100% !important; height: auto !important; margin: 0 0 15px 4px !important; }');
    GM_addStyle('.list { display: block !important; overflow: scroll !important; }');
    GM_addStyle('.list-cards { display: inline-flex !important; }');
    GM_addStyle('.list-card { width: 250px !important; margin-right: 10px !important; }');

    console.log('Trello-Horizontal-Plugin - Run Successfully');

})();