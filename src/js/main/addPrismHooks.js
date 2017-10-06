/**
 * addPrismHooks.js
 * @description  Adds class="lang-*" to TinyMCE-generated code snippets
 * @version  1.0.0
 * @author  Chris Ferdinandi
 */
portalReady(function () {

	// Get all code snippets
	var codes = document.querySelectorAll( 'pre' );

	var getLangClass = function ( lang ) {

		var langClass = '';

		if ( lang === 'bash' ) { langClass = 'lang-bash'; }
		if ( lang === 'csharp' ) { langClass = 'lang-clike'; }
		if ( lang === 'cpp' ) { langClass = 'lang-clike'; }
		if ( lang === 'css' ) { langClass = 'lang-css'; }
		if ( lang === 'java' ) { langClass = 'lang-java'; }
		if ( lang === 'jscript' ) { langClass = 'lang-javascript'; }
		if ( lang === 'php' ) { langClass = 'lang-php'; }
		if ( lang === 'python' ) { langClass = 'lang-python'; }
		if ( lang === 'ruby' ) { langClass = 'lang-ruby'; }
		if ( lang === 'xml' ) { langClass = 'lang-markup'; }

		return langClass;

	};

	for (var i = 0; i < codes.length; i++) {
		var lang = /brush: (.*?);/.exec( codes[i].className );
		if ( !lang || Object.prototype.toString.call( lang ) !== '[object Array]' || lang.length < 2 ) return;
		var langClass = getLangClass( lang[1] );
		codes[i].classList.add( langClass );
	}

});