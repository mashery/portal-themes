/**
 * Houdini Subnav
 * @description  A Houdini expand-and-collapse functionality to documentation pages.
 * @version      1.0.1
 * @author       Chris Ferdinandi
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('houdiniSubnav', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.houdiniSubnav = factory(root);
	}
})(window || this, function (root) {

	'use strict';

	//
	// Variables
	//

	var houdiniSubnav = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings, theNav, navs, navOriginal;

	// Default settings
	var defaults = {
		selectorNav: '#sub > ul',
		selectorNavs: '#sub > ul > li',
		isAccordion: false,
		iconShow: '+',
		iconHide: '&ndash;',
		iconAfter: true,
		iconMargin: '0.5em',
		initClass: 'js-houdini-subnav',
	};


	//
	// Methods
	//

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
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
		var merge = function (obj) {
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
	 * Create the link node
	 * @private
	 * @param  {Node}    navlink  The current link element
	 * @param  {Boolean} isActive If true, current link is the active one
	 * @param  {Number}  index    The index for the current link in the nodeslist
	 */
	var renderLink = function ( navlink, isActive, index ) {

		// Create link
		var toggle = navlink.parentNode.querySelector( 'a[data-collapse]' ) || document.createElement( 'a' );
		var location = settings.iconAfter ? navlink.nextSibling : navlink;
		toggle.href = '#docs-subnav-' + index;
		toggle.innerHTML = '<span class="collapse-text-show">' + settings.iconShow + '</span><span class="collapse-text-hide">' + settings.iconHide + '</span>';
		toggle.classList.add( 'collapse-toggle' );
		toggle.setAttribute( 'data-collapse', true );
		if ( isActive ) { toggle.classList.add( 'active' ); }
		if ( settings.isAccordion ) { toggle.setAttribute( 'data-group', 'docs-subnav' ); }

		// Add margin
		if ( settings.iconAfter ) {
			toggle.style.marginLeft = settings.iconMargin;
		} else {
			toggle.style.marginRight = settings.iconMargin;
		}

		// Inject link into DOM
		navlink.parentNode.insertBefore(toggle, location);

	};

	/**
	 * Loop through each subnav element and add expand-and-collapse attributes
	 * @private
	 * @param {NodesList} navs Nav elements
	 */
	var addAttributes = function ( navs, offset ) {
		offset = offset ? offset : '';
		forEach(navs, function (nav, index) {

			// Get subnav
			var subnav = nav.querySelector( 'ul' );

			// If no subnav, move on to the next nav element
			if ( !subnav ) return;

			// Get subnav link
			var navlink = nav.firstChild;

			// Determine if nav is active
			var isActive = nav.classList.contains( 'active' );

			// Remove .active class from parent li
			nav.classList.remove( 'active' );

			// Render the link
			renderLink( navlink, isActive, offset + '-' + index );

			// Add classes and ID to subnav
			subnav.classList.add( 'collapse' );
			subnav.id = 'docs-subnav-' + offset + '-' + index;
			if ( isActive ) { subnav.classList.add( 'active' ); }

			// If subnav has subnav, run again
			var subSubNavs = subnav.children;
			addAttributes( subSubNavs, offset + '-' + index );

		});
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	houdiniSubnav.destroy = function () {

		if ( !settings ) return;

		// Remove init class
		document.documentElement.classList.remove( settings.initClass );

		// Restore original nav
		theNav.innerHTML = navOriginal;

		// Reset variables
		settings = null;
		theNav = null;
		navs = null;

	};

	/**
	 * Initialize Houdini
	 * @public
	 * @param {Object} options User settings
	 */
	houdiniSubnav.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		houdiniSubnav.destroy();

		// Variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults
		theNav = document.querySelector( settings.selectorNav );
		navs = document.querySelectorAll( settings.selectorNavs );

		// If set to only run on Docs and not docs page, end
		if ( !document.body.classList.contains( 'page-docs' ) ) return;

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// Save original nav
		navOriginal = theNav.innerHTML;

		// Add Houdini hooks to subnav
		addAttributes( navs );

	};


	//
	// Public APIs
	//

	return houdiniSubnav;

});