/**
 * breadcrumbs.js
 * @description Add breadcrumbs to the Portal
 * @version     1.0.1
 * @author      Chris Ferdinandi
 */
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('breadcrumbs', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.breadcrumbs = factory(root);
	}
})(window || this, function (root) {

	'use strict';

	//
	// Variables
	//

	var breadcrumbs = {}; // Object for public APIs
	var supports = !!document.querySelector; // Feature test
	var settings, path;

	// Default settings
	var defaults = {
		pages: 'all', // all | docs | page | blog | forum | ioDocs | account
		exclude: '.dom-landing',
		selector: '#page',
		docs: 'Documentation',
		ioDocs: 'IO-Docs',
		forumAddCategory: 'Add Category',
		accountMyAccount: 'My Account',
		accountMyKeys: 'My API Keys',
		accountMyApps: 'My Applications',
		memberManage: 'Manage My Account',
		memberEmail: 'Change Email',
		memberPassword: 'Change Password',
		customTitles: {},
		initClass: 'js-breadcrumbs',
		containerClass: 'container padding-top-small text-muted link-plain',
		listClass: 'list-inline list-inline-breadcrumbs',
		callback: function () {},
	};


	//
	// Methods
	//

	/**
	 * Convert string to title case
	 * @private
	 * @param  {String} str The string to convert to title case
	 * @return {String}     Title cased string
	 * @url http://stackoverflow.com/a/4878800/1293256
	 * @todo  If IO-Docs, custom override
	 */
	var toTitleCase = function  ( str ) {

		// Variables
		var titleCase;

		// Otherwise, transform to title case
		titleCase = str.replace( /\w\S*/g,
			function ( txt ) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});

		// Manual overrides for certain pages
		if ( titleCase === 'Docs' ) titleCase = settings.docs; // Documentation
		if ( titleCase === 'Io-docs' ) titleCase = settings.ioDocs; // IO-Docs
		if ( titleCase === 'Category-add' ) titleCase = settings.forumAddCategory; // New Forum Category
		if ( titleCase === 'Mykeys' ) titleCase = settings.accountMyKeys; // My API Keys
		if ( titleCase === 'Myapps' ) titleCase = settings.accountMyApps; // My Applications
		if ( document.body.id === 'page-member' && titleCase === 'Edit' ) titleCase = settings.memberManage; // Manage Account
		if ( document.body.id === 'page-member' && titleCase === 'Email' ) titleCase = settings.memberEmail; // Change email
		if ( document.body.id === 'page-member' && titleCase === 'Passwd' ) titleCase = settings.memberPassword; // Change password
		if ( settings.customTitles.hasOwnProperty( titleCase.toLowerCase() ) ) titleCase = settings.customTitles[titleCase.toLowerCase()]; // Custom overrides

		// @todo If forum and not "add category", return empty after 'forum'

		return titleCase;

	};

	/**
	 * Remove junk from the path and set variables
	 * @private
	 * @param  {String} path The URL path
	 * @return {[type]}      [description]
	 */
	var sanitizePath = function () {

		// If Docs or Blog, remove /read and /Home
		if ( document.body.classList.contains( 'page-docs' ) || document.body.classList.contains( 'page-blog' ) ) {
			path = path.replace( /\/read/, '' ).replace( /\/Home/, '' );
		}

		// If Forum, remove /read
		if ( document.body.classList.contains( 'page-forum' ) ) {
			path = path.replace( /\/read/, '' );
		}

		// If Profile, remove redundant /profile
		if ( document.body.classList.contains( 'page-profile' ) ) {
			path = path.substring( path.indexOf( '/profile' ), 8 );
		}

		// Remove leading and trailing slashes
		if ( path.charAt(0) === '/' ) { path = path.substr(1); }
		if ( path.charAt( path.length - 1 ) === '/' ) { path = path.substr(0, path.length - 1); }

	};

	/**
	 * Create breadcrumb markup
	 * @private
	 * @return {String} The breadcrumb markup
	 */
	var createBreadcrumbs = function () {

		// Variables
		var crumbs = path.split( '/' );
		var count = crumbs.length;
		var breadcrumbs = '<li><a href="/">Home</a></li>';
		var isForum = document.body.classList.contains( 'page-forum' );
		var link = '';

		// If it's the landing page, remove link from "Home" breadcrumb
		if ( document.documentElement.classList.contains( 'dom-landing' ) ) breadcrumbs = '<li>Home</li>';

		// Create breadcrumb links
		buoy.forEach(crumbs, function (crumb, index) {

			// If crumb is empty or it's the forum, bail
			if ( crumb === '' || isForum ) return;

			// Create the title
			var title = toTitleCase( crumb.replace( /_/g, ' ' ) );

			// If the last crumb, don't add a link
			if ( index === count - 1 ) {
				breadcrumbs += '<li>' + title + '</li>';
				return;
			}

			// If is account/member page, override App/Member crumb
			if ( document.body.classList.contains( 'page-apps' ) || document.body.classList.contains( 'page-member' ) ) {
				if ( title === 'Apps' || title === 'Member'  ) {
					breadcrumbs += '<li><a href="/apps/mykeys">' + settings.accountMyAccount + '</a></li>';
					return;
				}
			}

			// Otherwise, create a linked crumb
			link += '/' + crumb;
			console.log(link);
			breadcrumbs += '<li><a href="' + link + '">' + title + '</a></li>';

		});

		// Custom breadcrumb for the forum
		if ( isForum ) {
			if ( document.documentElement.classList.contains( 'dom-forum' ) ) {
				breadcrumbs += '<li>Forum</li>';
			} else {
				breadcrumbs += '<li><a href="/forum">Forum</a></li>';
			}
		}

		return '<div class="' + settings.containerClass + '" id="nav-breadcrumbs"><ul class="' + settings.listClass + '" id="nav-breadcrumbs-list">' + breadcrumbs + '</ul></div>';

	};

	/**
	 * Load breadcrumbs into the DOM
	 * @private
	 */
	var loadCrumbs = function () {

		// Remove junk from the path
		sanitizePath();

		// Create breadcrumbs
		var breadcrumbs = createBreadcrumbs();

		// Inject breadcrumbs into the DOM
		loadHTML( breadcrumbs, document.querySelector( settings.selector ) );

		// Run callback
		settings.callback();

	};

	/**
	 * Check to see if the page is on the exclude/include list
	 * @private
	 * @return {Boolean} Returns true if the breadcrumbs should be loaded onto the page
	 */
	var okToRun = function () {

		// Variables
		var selectors = '';

		// Don't run on explicitly excluded pages
		if ( settings.exclude && document.querySelector( settings.exclude ) ) return false;

		// Don't run on the wiki page
		if ( document.body.classList.contains( 'page-wiki' ) ) return false;

		// Create selector(s)
		if ( Object.prototype.toString.call( settings.pages ) === '[object Array]' ) {

			// Get number of pages
			var count = settings.pages.length;

			// For each one, create a selector
			buoy.forEach(settings.pages, function (page, index) {

				// Add a comma delimiter to all but the last item
				var delimiter = index + 1 === count ? '' : ', ';

				// Special dual class for account pages
				if ( page === 'account' ) {
					selectors += '.page-account, .page-member';
					return;
				}

				// Create selector
				selectors += '.page-' + page + delimiter;

			});
		} else {

			// If it should be run on all pages, return true
			if ( settings.pages === 'all' ) return true;

			// Create selector
			selectors = '.page-' + settings.pages;

		}

		// If selectors exist, OK to run.
		// Otherwise, return false.
		var pages = document.querySelectorAll( selectors );
		if ( pages.length === 0 ) return false;
		return true;

	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	breadcrumbs.destroy = function () {

		if ( !settings ) return;

		// Remove init class
		document.documentElement.classList.remove( settings.initClass );

		// Remove breadcrumbs from the DOM
		var breadcrumbs = document.querySelector( '#nav-breadcrumbs' );
		if ( breadcrumbs ) {
			breadcrumbs.parentNode.removeChild( breadcrumbs );
		}

		// Reset variables
		settings = null;
		path = null;

	};

	/**
	 * Initialize Houdini
	 * @public
	 * @param {Object} options User settings
	 */
	breadcrumbs.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		breadcrumbs.destroy();

		// Merge user options with defaults
		settings = buoy.extend( true, defaults, options || {} );

		// Check if it's ok to run based on user settings
		if ( !okToRun() ) return;

		// Get the current URL path
		path = window.location.pathname;

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// Load breadcrumbs onto the page
		loadCrumbs();

	};


	//
	// Public APIs
	//

	return breadcrumbs;

});