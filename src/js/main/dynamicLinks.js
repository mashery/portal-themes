/**
 * dynamicLinks.js
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 * @description Change the href on a link if the user is signed in
 * @version     1.0.0
 * @author      Chris Ferdinandi
 * @param {String} link  Selector for links (must be a valid CSS selector)
 * @param {String} url   The URL to send logged-in users to
 */
var dynamicLinks = function ( link, url ) {

    // Only run if user is logged in
    if ( !mashery_info || !mashery_info.username ) return;

    // Sanity check
    if ( !link || !url ) return;

    // Variables
    var links = document.querySelectorAll( link );

    // Change links to point to new URL
    for ( var i = 0, len = links.length; i < len; i++ ) {
        links[i].href = url;
    }

};