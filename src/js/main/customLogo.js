/**
 * loadCustomLogo.js
 * Add custom logo to the Portal.
 */
var loadCustomLogo = function ( logo ) {

	'use strict';

	// Feature test
	if ( !document.querySelector || !window.addEventListener ) return;

	// Get nav logo
	var navLogo = document.querySelector( '#nav-1-logo' );

	// Sanity check
	if ( !logo || !navLogo ) return;

	// Load logo
	navLogo.innerHTML = logo;

};