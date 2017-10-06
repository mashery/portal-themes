/**
 * clickToHighlight.js
 * @description  Highlight text when clicked.
 * @version  1.0.0
 * @author  Chris Ferdinandi
 */
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('clickToHighlight', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.clickToHighlight = factory(root);
	}
})(window || this, function (root) {

	'use strict';

	//
	// Variables
	//

	var clickToHighlight = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings, range;

	// Default settings
	var defaults = {
		initClass: 'js-click-highlight',
		callback: function () {}
	};


	//
	// Methods
	//

	/**
	 * Highlight clicked text.
	 * @param {Node} elem The elem whose content to highlight.
	 */
	clickToHighlight.highlight = function ( elem ) {
		if ( document.selection ) {
			range = document.body.createTextRange();
			range.moveToElementText( elem );
			range.select();
		} else if ( window.getSelection ) {
			range = document.createRange();
			range.selectNode( elem );
			window.getSelection().addRange( range );
		}
		settings.callback();
	};

	/**
	 * Handle toggle click events
	 * @private
	 */
	var eventHandler = function (event) {
		var toggle = buoy.getClosest(event.target, '[data-click-highlight]');
		if ( toggle ) {
			clickToHighlight.highlight( toggle );
		}
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	clickToHighlight.destroy = function () {
		if ( !settings ) return;
		document.documentElement.classList.remove( settings.initClass );
		document.removeEventListener('click', eventHandler, false);
		settings = null;
		range = null;
	};

	/**
	 * Initialize Houdini
	 * @public
	 * @param {Object} options User settings
	 */
	clickToHighlight.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		clickToHighlight.destroy();

		// Merge user options with defaults
		settings = buoy.extend( defaults, options || {} );

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// Listen for all click events
		document.addEventListener('click', eventHandler, false);

	};


	//
	// Public APIs
	//

	return clickToHighlight;

});