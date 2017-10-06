/**
 * toggleIODocs.js
 * @description Dynamically togle IO-Docs selection using a URK query selector
 * @version     2.0.0
 * @author      Chris Ferdinandi
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('toggleIODocs', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.toggleIODocs = factory(root);
	}
})(window || this, function (root) {

	'use strict';


	//
	// Variables
	//

	var toggleIODocs = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings, select;

	// Default settings
	var defaults = {
		initClass: 'js-toggle-io-docs',
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
	 * Find the selected method in the DOM
	 * @param  {string} name The method to scroll to
	 * @return {node}        The method in the DOM
	 */
	var getMethod = function ( name ) {
		if ( !name ) return;
		var methods = document.querySelectorAll( '.method .name' );
		for ( var i = 0, len = methods.length; i < len; i++ ) {
			if ( methods[i].innerHTML.toLowerCase().trim() === decodeURI( name ).toLowerCase() ) {
				return methods[i].parentNode.parentNode;
			}
		}
	};

	/**
	 * Scroll to the method
	 * @param  {string} name The method to scroll to
	 */
	var scrollToMethod = function ( name ) {
		if ( !name ) return;
		var methodParent = getMethod( Object.prototype.toString.call( name ) === '[object Array]' ? name[1] : name );
		if ( !methodParent ) return;
		var method = methodParent.querySelector( 'form' );
		if ( !method ) return;
		method.style.display = 'block';
		methodParent.id = 'js-method-scrollto';
		setTimeout(function() {
			smoothScroll.animateScroll( '#js-method-scrollto', null, { updateURL: false } );
		}, 264);
	};

	/**
	 * Toggle the select IO-Docs API
	 * @param  {String} val The API select value to activate
	 */
	var toggleAPI = function ( val ) {
		var options = select.options;
		for ( var i = 0, len = options.length; i < len; i++ ) {
			if ( options[i].innerHTML.toLowerCase().trim() === decodeURI( val ).toLowerCase() ) {
				select.value = options[i].value;
				break;
			}
		}
		if ( 'createEvent' in document ) {
			var change = document.createEvent( 'HTMLEvents' );
			change.initEvent( 'change', false, true );
			select.dispatchEvent( change );
			return;
		}
		select.fireEvent( 'onchange' );
	};

	/**
	 * Toggle the select IO-Docs API
	 * @param  {String} val The API select value to activate
	 */
	toggleIODocs.toggle = function ( api, method, options ) {

		// Variables
		var localSettings = extend( settings || defaults, options || {} );
		select = document.querySelector( '#apiId' ); // API selector
		api = api ? api : /[\\?&]api=([^&#]*)/i.exec(root.location.href);
		method = method ? method : /[\\?&]method=([^&#]*)/i.exec(root.location.href);

		// Sanity check
		if ( !select || !api || api.length < 2 ) return;

		// Update selected value
		toggleAPI( Object.prototype.toString.call( api ) === '[object Array]' ? api[1] : api );

		// Scroll to selected method
		scrollToMethod( method );

		// Callback
		localSettings.callback( select, api, method );

	};


	/**
	 * Destroy the current initialization.
	 * @public
	 */
	toggleIODocs.destroy = function () {

		if ( !settings ) return;

		// Remove init class
		document.documentElement.classList.remove( settings.initClass );

		// Scroll back to the top of the page
		root.scroll( 0, 0 );

		// Reset select menu
		toggleAPI(0);

		// Reset variables
		settings = null;
		select = null;

	};

	/**
	 * Initialize script
	 * @public
	 * @param {Object} options User settings
	 */
	toggleIODocs.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Only run on IO-Docs page
		if ( !document.body.classList.contains( 'page-ioDocs' ) ) return;

		// Destroy any existing initializations
		toggleIODocs.destroy();

		// Merge user options with defaults
		settings = extend( true, defaults, options || {} );

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// Toggle IO-Docs
		toggleIODocs.toggle( null, null, settings );

	};


	//
	// Public APIs
	//

	return toggleIODocs;

});