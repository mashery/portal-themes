/**
 * Adds onload support for asynchronous stylesheets loaded with loadCSS.
 * @author  @zachleat, Filament Group, Inc.
 * @license MIT
 * @link https://github.com/filamentgroup/loadCSS
 * @param {Function} ss loadCSS method
 * @param {Function} callback Callback to run when successful
 */
var onloadCSS = function ( ss, callback ) {

	'use strict';

	ss.onload = function() {
		ss.onload = null;
		if( callback ) {
			callback.call( ss );
		}
	};

	// This code is for browsers that don’t support onload, any browser that
	// supports onload should use that instead.
	// No support for onload:
	//	* Android 4.3 (Samsung Galaxy S4, Browserstack)
	//	* Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)
	//	* Android 2.3 (Pantech Burst P9070)

	// Weak inference targets Android < 4.4
	if( 'isApplicationInstalled' in navigator && 'onloadcssdefined' in ss ) {
		ss.onloadcssdefined( callback );
	}
};