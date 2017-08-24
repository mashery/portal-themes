/**
 * Load a CSS file asynchronously.
 * @author @scottjehl, Filament Group, Inc.
 * @license MIT
 * @link https://github.com/filamentgroup/loadCSS
 * @param  {String} href   The URL for your CSS file.
 * @param  {Object} before Optionally defines the element we'll use as a reference for injecting our <link>.
 * @param  {String} media  CSS media type (default: All).
 * @return {Object}        The stylesheet.
 */
var loadCSS = function ( href, before, media ){
	'use strict';
	var ss = window.document.createElement( 'link' );
	var ref = before || window.document.getElementsByTagName( 'script' )[ 0 ];
	var sheets = window.document.styleSheets;
	ss.rel = 'stylesheet';
	ss.href = href;
	// temporarily, set media to something non-matching to ensure it'll fetch without blocking render
	ss.media = 'only x';
	// inject link
	ref.parentNode.insertBefore( ss, ref );
	// This function sets the link's media back to `all` so that the stylesheet applies once it loads
	// It is designed to poll until document.styleSheets includes the new sheet.
	function toggleMedia(){
		var defined;
		for( var i = 0; i < sheets.length; i++ ){
			if( sheets[ i ].href && sheets[ i ].href.indexOf( href ) > -1 ){
				defined = true;
			}
		}
		if( defined ){
			ss.media = media || 'all';
		}
		else {
			setTimeout( toggleMedia );
		}
	}
	toggleMedia();
	return ss;
};