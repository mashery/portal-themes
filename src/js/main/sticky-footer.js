/**
 * sticky-footer v2.0.2
 * Responsive sticky footers, by Chris Ferdinandi.
 * http://github.com/cferdinandi/sticky-footer
 *
 * Free to use under the MIT License.
 * http://gomakethings.com/mit/
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('stickyFooter', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.stickyFooter = factory(root);
	}
})(window || this, function (root) {

	'use strict';

	//
	// Variables
	//

	var stickyFooter = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings, content, footer, eventTimeout;

	// Default settings
	var defaults = {
		selector: '[data-sticky-footer]',
		content: '#content',
		callback: function () {}
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
	 * Get the height of an element
	 * @param  {Node}   elem The element
	 * @return {Number}      The height
	 */
	var getHeight = function ( elem ) {
		return Math.max( elem.scrollHeight, elem.offsetHeight, elem.clientHeight );
	};

	/**
	 * Get an element's distance from the top of the page
	 * @param  {Node}   elem The element
	 * @return {Number}      Distance from the top of the page
	 */
	var getElemDistance = function ( elem ) {
		var location = 0;
		if ( elem.offsetParent ) {
			do {
				location += elem.offsetTop;
				elem = elem.offsetParent;
			} while ( elem );
		}
		return location >= 0 ? location : 0;
	};

	/**
	 * Get height of the viewport
	 * @private
	 * @return {Number} Height of the viewport in pixels
	 */
	var getViewportHeight = function () {
		return Math.max( document.documentElement.clientHeight, window.innerHeight || 0 );
	};

	/**
	 * Set page content min-height to push footer to the bottom of the page
	 * @public
	 */
	stickyFooter.setContentHeight = function ( content, footer, options ) {
		var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var viewHeight = getViewportHeight();
		var contentHeight = getHeight( content );
		var footerHeight = getHeight( footer );
		var footerOffset = getElemDistance( footer );
		var gap = viewHeight - footerHeight - footerOffset;

		content.style.minHeight = ( contentHeight + gap ) + 'px';
		settings.callback();
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	stickyFooter.destroy = function () {

		if ( !settings ) return;

		// Unset styles
		document.documentElement.style.minHeight = '';
		document.body.style.minHeight = '';
		content.style.minHeight = '';
		window.removeEventListener( 'resize', eventThrottler, false );

		// Reset variables
		settings = null;
		content = null;
		footer = null;
		eventTimeout = null;

	};

	/**
	 * On window resize, only run events at a rate of 15fps for better performance
	 * @private
	 * @param  {Function} eventTimeout Timeout function
	 * @param  {NodeList} wrap The content wrapper for the page
	 * @param  {NodeList} footer The footer for the page
	 * @param  {Object} settings
	 */
	var eventThrottler = function () {
		if ( !eventTimeout ) {
			eventTimeout = setTimeout(function() {
				eventTimeout = null;
				stickyFooter.setContentHeight( content, footer, settings );
			}, 66);
		}
	};

	/**
	 * Initialize Plugin
	 * @public
	 * @param {Object} options User settings
	 */
	stickyFooter.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		stickyFooter.destroy();

		// Selectors and variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults
		content = document.querySelector( settings.content );
		footer = document.querySelector( settings.selector );

		// If there is no content or no sticky footer, end function
		if ( !content || !footer ) return;

		// Stick footer
		document.documentElement.style.minHeight = '100%';
		document.body.style.minHeight = '100%';
		stickyFooter.setContentHeight( content, footer, settings );
		window.addEventListener( 'resize', eventThrottler, false); // Run Sticky Footer on window resize

	};


	//
	// Public APIs
	//

	return stickyFooter;

});