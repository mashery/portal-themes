/**
 * Responsive tables
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 * @description Automatically make tables on documentation page responsive
 * @version     1.0.0
 * @author      Chris Ferdinandi
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('responsiveTables', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.responsiveTables = factory(root);
	}
})(window || this, function (root) {

	'use strict';

	//
	// Variables
	//

	var responsiveTables = {}; // Object for public APIs
	var supports = !!document.querySelector; // Feature test
	var settings, tables;

	// Default settings
	var defaults = {
		selector: 'table',
		responsiveClass: 'table-responsive',
		initClass: 'js-responsive-tables',
		callback: function () {},
	};


	//
	// Methods
	//

	/**
	 * Merge two or more objects. Returns a new object.
	 * Set the first argument to `true` for a deep or recursive merge
	 * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
	 * @param {Object}   objects  The objects to merge together
	 * @returns {Object}          Merged values of defaults and options
	 */
	var extend = function () {

		// Variables
		var extended = {};
		var deep = false;
		var i = 0;
		var length = arguments.length;

		// Check if a deep merge
		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function ( obj ) {
			for ( var prop in obj ) {
				if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
					// If deep merge and property is an object, merge properties
					if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
						extended[prop] = extend( true, extended[prop], obj[prop] );
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for ( ; i < length; i++ ) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	/**
	 * Add data-label attributes
	 * @param {node} table The table to add data-label attributes to
	 */
	var addLabels = function ( table ) {

		// Variables
		var labels = table.querySelectorAll( 'th' );
		var rows = table.querySelectorAll( 'tr' );

		// Sanity check
		if ( labels.length === 0 || rows.length === 0 ) return;

		// Loop through each row
		for ( var i = 0, len = rows.length; i < len; i++ ) {

			// Get cells within the row
			var cells = rows[i].querySelectorAll( 'td' );

			// For each cell, add a data-label
			for ( var n = 0, len2 = cells.length; n < len2; n++ ) {
				if ( !labels[n] ) continue;
				cells[n].setAttribute( 'data-label', labels[n].innerHTML );
			}
		}

	};

	/**
	 * Add attributes to the tables
	 * @param {NodeList} tables The tables
	 */
	var addAttributes = function ( tables ) {
		for ( var i = 0, len = tables.length; i < len; i++ ) {
			tables[i].classList.add( settings.responsiveClass );
			addLabels( tables[i] );
		}
	};


	/**
	 * Destroy the current initialization.
	 * @public
	 */
	responsiveTables.destroy = function () {

		// If plugin isn't already initialized, stop
		if ( !settings ) return;

		// Remove responsive class
		for ( var i = 0, len = tables.length; i < len; i++ ) {
			tables[i].classList.remove( settings.responsiveClass );
		}

		// Reset variables
		settings = null;
		tables = null;

	};

	/**
	 * Initialize Responsive Tables
	 * @public
	 * @param {Object} options User settings
	 */
	responsiveTables.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing inits
		responsiveTables.destroy();

		// Merge user options with defaults
		settings = extend( true, defaults, options || {} );

		// Only run on documentation and custom pages
		if ( !document.body.classList.contains( 'page-docs' ) && !document.body.classList.contains( 'page-page' ) ) return;

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// Get all responsive tables
		tables = document.querySelectorAll( settings.selector );

		// Make them responsive
		addAttributes( tables );

		// Run callback
		settings.callback();

	};


	//
	// Public APIs
	//

	return responsiveTables;

});