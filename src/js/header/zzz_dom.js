/**
 * dom.js
 * Add DOM manipulation/generation scripts here.
 */

;(function (window, document, undefined) {

	'use strict';

	// Feature test
	if ( !document.querySelector || !window.addEventListener ) return;

	/**
	 * Add header navigation
	 * Commented out by default
	 */
	portalReady(function () {

		// Create nav structure
		var nav =
			'<nav class="nav-wrap nav-collapse padding-top-small padding-bottom-small" id="nav-1">' +
				'<div class="container">' +
					'<a class="logo" id="nav-1-logo" href="/">' +
						'<!-- Logo goes here -->' +
					'</a>' +
					'<a class="nav-toggle" id="nav-menu-toggle" data-nav-toggle="#nav-menu" href="#">' +
						'Menu &#9776;' +
					'</a>' +
					'<div class="nav-menu" id="nav-menu">' +
						'<ul class="nav" id="nav-1-content">' +
							'<!-- Nav goes here -->' +
							'<li id="nav-search"></li>' +
						'</ul>' +
					'</div>' +
				'</div>' +
			'</nav>';

		// Create userNav
		var userNav =
			'<nav class="nav-user padding-top-small padding-bottom-small" id="nav-user">' +
				'<div class="container">' +
					'<ul class="list-inline float-right no-margin-bottom" id="nav-user-content">' +
						'<!-- User nav goes here -->' +
					'</ul>' +
				'</div>' +
			'</nav>';

		var searchBtn =
			'<button type="submit" class="btn-search" id="searchsubmit">' +
				'<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 32 32"><path d="M31.008 27.23l-7.58-6.446c-.784-.705-1.622-1.03-2.3-.998C22.92 17.69 24 14.97 24 12 24 5.37 18.627 0 12 0S0 5.37 0 12c0 6.626 5.374 12 12 12 2.973 0 5.692-1.082 7.788-2.87-.03.676.293 1.514.998 2.298l6.447 7.58c1.105 1.226 2.908 1.33 4.008.23s.997-2.903-.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path></svg>' +
				'<span class="icon-fallback-text">Search</span>' +
			'</button>';

		// Create skipnav
		var skipNav = '<a class="screen-reader screen-reader-focusable" href="#content">Skip Navigation</a>';
		var content = document.querySelector( '#content' );


		// Load nav
		loadHTML( nav, document.querySelector( '#page' ) ); // Load nav into page
		moveElem( document.querySelector( '#local ul' ), document.querySelector( '#nav-1-content' ), true); // Move nav links into the navbar
		moveElem( document.querySelector( '#branding-logo' ), document.querySelector( '#nav-1-logo' ), true); // Move logo into the navbar
		moveElem( document.querySelector( '#search' ), document.querySelector( '#nav-search' ), true ); // Load search into nav
		loadHTML( searchBtn, document.querySelector( '#search-box' ), true );

		// Load user nav
		loadHTML( userNav, document.querySelector( '#nav-1' ) ); // Load user nav into page
		moveElem( document.querySelector( '#user-nav ul' ), document.querySelector( '#nav-user-content' ), true); // Move nav links into the nav

		// Load skip nav link at the top of the <body> element
		loadHTML( skipNav, document.body.firstChild );
		if ( content ) {
			content.classList.add( 'tabindex' );
			content.setAttribute( 'tabindex', '-1' );
		}


	});


	/**
	 * Load true active state on sub nav links
	 */
	portalReady(function () {

		// Variables
		var links = document.querySelectorAll( '.sub ul a' );
		var url = window.location.href;
		var isDocsLanding = document.documentElement.classList.contains( 'dom-docs' );

		/**
		 * Add active class to link
		 */
		var activate = function ( elem ) {
			var parent = elem.parentNode;
			if (!parent) return;
			parent.className += ' js-active';
		};

		// Check if current link is active
		for ( var i = 0, len = links.length; i < len; i++ ) {

			// Get href
			var href = links[i].href;

			// Sanity check
			if ( !href ) continue;

			if ( isDocsLanding && /\/docs\/read\/Home/.test(href) ) {
				activate( links[i] );
				return;
			}

			if ( href === url ) {
				activate( links[i] );
				return;
			}

		}

	});


	/**
	 * Relocate footer
	 */
	portalReady(function () {
		moveElem( document.querySelector( '#footer' ), document.querySelector( '#page' ), false, true );
	});


	/**
	 * Relocate footer navigation
	 */
	portalReady(function () {

		// Get footer
		var footer = document.querySelector( '#footer ul' );
		var navWrap = document.querySelector( '#nav-footer' );

		// Sanity check
		if ( !footer || !footer.querySelector( 'li.first' ) || !navWrap ) return;

		// Move footer navigation
		navWrap.innerHTML = '<ul class="list-inline list-inline-responsive margin-bottom-small" id="nav-footer-content"></ul>';
		moveElem( footer, document.querySelector( '#nav-footer-content' ), true );

	});


	/**
	 * Improve search form accessibility
	 */
	portalReady(function () {

		// Variables
		var fields = document.querySelectorAll( '#search-box, .search-form input[type="text"]' );
		var label = '<label class="screen-reader">Search</label>';

		// Loop through each search field
		for ( var i = 0, len = fields.length; i < len; i++ ) {
			fields[i].setAttribute( 'placeholder', 'Search...' ); // Add placeholder text
			loadHTML( label, fields[i] ); // Add hidden label for screen readers
		}

	});


	/**
	 * Update RSS link in forums
	 */
	portalReady(function () {

		// Only run on forum and blog
		var page;
		if ( document.body.classList.contains( 'page-forum' ) ) { page = 'forum'; }
		if ( document.body.classList.contains( 'page-blog' ) ) { page = 'blog'; }
		if ( !page ) return;

		// If no RSS feed, end function
		var feed = document.querySelector( 'a.rss' );
		if ( !feed ) return;

		// Variables
		var location;
		if ( page === 'forum' ) {
			var heading = document.querySelector( '.section-body h2' );
			var subject = document.querySelector( 'h3.subject' );
			location = subject ? subject : heading;
		}
		if ( page === 'blog' ) {
			location = document.querySelector( 'h1.first' );
		}
		var icon = '<svg xmlns="http://www.w3.org/2000/svg" class="rss-icon" viewBox="0 0 16 16"><path d="M13.333 0h-10.666c-1.467 0-2.667 1.2-2.667 2.667v10.666c0 1.468 1.2 2.667 2.667 2.667h10.666c1.467 0 2.667-1.199 2.667-2.667v-10.666c0-1.467-1.2-2.667-2.667-2.667zM4.359 12.988c-0.75 0-1.359-0.605-1.359-1.354 0-0.745 0.609-1.356 1.359-1.356 0.752 0 1.36 0.611 1.36 1.356-0 0.749-0.608 1.354-1.36 1.354zM7.773 13c0-1.278-0.497-2.482-1.398-3.382-0.902-0.902-2.1-1.4-3.373-1.4v-1.956c3.713 0 6.736 3.023 6.736 6.738l-1.965 0zM11.244 13c0-4.548-3.698-8.249-8.24-8.249v-1.957c5.625 0 10.202 4.58 10.202 10.206l-1.962-0z"></svg>';

		// Load RSS link
		location.innerHTML += ' <a href="' + feed.href + '">' + icon + '</a>';

	});


	/**
	 * Add `http://` to URL fields on registration pages
	 */
	portalReady(function () {

		// Get URL fields
		var urls = document.querySelectorAll( '#applications-uri, #members-uri, #members-blog' );

		// Add `http://` to URL fields
		for ( var i = 0; i < urls.length; i++ ) {
			if ( urls[i].value !== '' ) continue;
			urls[i].value = 'http://';
		}

	});


	/**
	 * Update document page title
	 */
	portalReady(function () {

		// Update page title
		var currentTitle = document.title;
		if ( / - /.test( currentTitle ) ) {

			// Get site and page names
			var split = currentTitle.indexOf( ' - ' );
			var site = currentTitle.substr( 0,  split);
			var page = currentTitle.substr( split + 3, currentTitle.length - split);

			// If is landing page, set title to site name
			if ( document.documentElement.classList.contains( 'dom-landing' ) ) {
				document.title = site;
				return;
			}

			// Otherwise, modify site title
			document.title = page + ' | ' + site;
		}

	});


	/**
	 * Remove empty paragraphs
	 */
	portalReady(function () {

		// Get and remove all empty paragraphs
		var pars = document.querySelectorAll('p');
		for (var i = 0; i < pars.length; i++) {
			if ( pars[i].innerHTML === '' ) {
				pars[i].parentNode.removeChild(pars[i]);
			}
		}

	});

})(window, document);


/**
 * Undo default syntax highlighting
 * @type {Object}
 */
SyntaxHighlighter = {};
SyntaxHighlighter.all = function () {};