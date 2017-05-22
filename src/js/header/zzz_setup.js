/**
 * zzz_setup.js
 * Add page setup scripts here
 */


/**
 * Remove default stylesheets
 */

;(function (window, document, undefined) {

	'use strict';

	// Get the current URL path
	var path = window.location.pathname; // Get the current URL path

	// Remove unused stylesheets
	removeCSS( 'localdev.css' ); // Remove localdev specific CSS. Do not use on production sites.
	removeCSS( 'Mashery-base.css' ); // Remove the base Mashery CSS
	removeCSS( 'print-defaults.css' ); // Remove the default print CSS

	// If the IODocs page, also remove IODocs specific CSS
	if ( /\/io-docs/.test( path ) ) {
		removeCSS( 'Iodocs/style.css' );
		removeCSS( 'alpaca.min.css' );
	}

})(window, document);


/**
 * Add a class to the <html> element based on the URL path
 */

;(function (window, document, undefined) {

    'use strict';

    // Get the current URL path
    var path = window.location.pathname;

    // Remove leading and trailing slashes
    if ( path.charAt(0) === '/' ) { path = path.substr(1); }
    if ( path.charAt( path.length - 1 ) === '/' ) { path = path.substr(0, path.length - 1); }

    // Remove /read/ from path
    path = path.replace( /\/read\//, '/' );

    // Create class
    var pathClass = path.replace( /\//g, '-' ).replace( /_/g, '-' ).replace( /\%20/g, '-' ).toLowerCase(); // Replace slashes and spaces with dashes
    if ( pathClass.substr( -5 ) === '-home' ) { pathClass = pathClass.substr( 0, pathClass.length - 5 ); } // Remove -home from end of string
    if ( pathClass.substr( -4 ) === 'home' ) { pathClass = pathClass.substr( 0, pathClass.length - 4 ); } // Remove -home from end of string
    if ( !pathClass || pathClass ===  ( '' || 'page' || 'home' )  ) { pathClass = 'landing'; } // Use special class for homepage
    var loggedIn = typeof mashery_info === 'undefined' || !mashery_info || !mashery_info.username ? ' is-logged-out' : ' is-logged-in';

    // Add classes to DOM
    document.documentElement.className += ' dom-' + pathClass + loggedIn;

})(window, document);