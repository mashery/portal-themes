/*!
 * biogen v1.0.0: Portal theme for Biogen
 * Copyright (c) 2017 TIBCO Software Inc. All Rights Reserved.
 * Built on the Sparrow Boilerplate v9.3.0
 * BSD-type License
 * https://github.com/mashery/sparrow
 */

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2014-01-31
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if ("document" in self && !("classList" in document.createElement("_"))) {

	(function (view) {

		"use strict";

		if (!('Element' in view)) return;

		var
			classListProp = "classList",
			protoProp = "prototype",
			elemCtrProto = view.Element[protoProp],
			objCtr = Object,
			strTrim = String[protoProp].trim || function () {
				return this.replace(/^\s+|\s+$/g, "");
			},
			arrIndexOf = Array[protoProp].indexOf || function (item) {
				var
					i = 0,
					len = this.length;
				for (; i < len; i++) {
					if (i in this && this[i] === item) {
						return i;
					}
				}
				return -1;
			},
			// Vendors: please allow content code to instantiate DOMExceptions
			DOMEx = function (type, message) {
				this.name = type;
				this.code = DOMException[type];
				this.message = message;
			},
			checkTokenAndGetIndex = function (classList, token) {
				if (token === "") {
					throw new DOMEx(
						"SYNTAX_ERR",
						"An invalid or illegal string was specified"
					);
				}
				if (/\s/.test(token)) {
					throw new DOMEx(
						"INVALID_CHARACTER_ERR",
						"String contains an invalid character"
					);
				}
				return arrIndexOf.call(classList, token);
			},
			ClassList = function (elem) {
				var
					trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
					classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
					i = 0,
					len = classes.length;
				for (; i < len; i++) {
					this.push(classes[i]);
				}
				this._updateClassName = function () {
					elem.setAttribute("class", this.toString());
				};
			},
			classListProto = ClassList[protoProp] = [],
			classListGetter = function () {
				return new ClassList(this);
			};
		// Most DOMException implementations don't allow calling DOMException's toString()
		// on non-DOMExceptions. Error's toString() is sufficient here.
		DOMEx[protoProp] = Error[protoProp];
		classListProto.item = function (i) {
			return this[i] || null;
		};
		classListProto.contains = function (token) {
			token += "";
			return checkTokenAndGetIndex(this, token) !== -1;
		};
		classListProto.add = function () {
			var
				tokens = arguments,
				i = 0,
				l = tokens.length,
				token,
				updated = false;
			do {
				token = tokens[i] + "";
				if (checkTokenAndGetIndex(this, token) === -1) {
					this.push(token);
					updated = true;
				}
			}
			while (++i < l);

			if (updated) {
				this._updateClassName();
			}
		};
		classListProto.remove = function () {
			var
				tokens = arguments,
				i = 0,
				l = tokens.length,
				token,
				updated = false;
			do {
				token = tokens[i] + "";
				var index = checkTokenAndGetIndex(this, token);
				if (index !== -1) {
					this.splice(index, 1);
					updated = true;
				}
			}
			while (++i < l);

			if (updated) {
				this._updateClassName();
			}
		};
		classListProto.toggle = function (token, force) {
			token += "";

			var
				result = this.contains(token),
				method = result ? force !== true && "remove" : force !== false && "add";

			if (method) {
				this[method](token);
			}

			return !result;
		};
		classListProto.toString = function () {
			return this.join(" ");
		};

		if (objCtr.defineProperty) {
			var classListPropDesc = {
				get: classListGetter,
				enumerable: true,
				configurable: true
			};
			try {
				objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
			} catch (ex) { // IE 8 doesn't support enumerable:true
				if (ex.number === -0x7FF5EC54) {
					classListPropDesc.enumerable = false;
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				}
			}
		} else if (objCtr[protoProp].__defineGetter__) {
			elemCtrProto.__defineGetter__(classListProp, classListGetter);
		}

	}(self));

}
/**
 * clickToHighlight.js
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
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
})(window || this, (function (root) {

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

}));
(function(){'use strict';var f,g=[];function l(a){g.push(a);1==g.length&&f()}function m(){for(;g.length;)g[0](),g.shift()}f=function(){setTimeout(m)};function n(a){this.a=p;this.b=void 0;this.f=[];var b=this;try{a((function(a){q(b,a)}),(function(a){r(b,a)}))}catch(c){r(b,c)}}var p=2;function t(a){return new n(function(b,c){c(a)})}function u(a){return new n(function(b){b(a)})}function q(a,b){if(a.a==p){if(b==a)throw new TypeError;var c=!1;try{var d=b&&b.then;if(null!=b&&"object"==typeof b&&"function"==typeof d){d.call(b,(function(b){c||q(a,b);c=!0}),(function(b){c||r(a,b);c=!0}));return}}catch(e){c||r(a,e);return}a.a=0;a.b=b;v(a)}}
function r(a,b){if(a.a==p){if(b==a)throw new TypeError;a.a=1;a.b=b;v(a)}}function v(a){l((function(){if(a.a!=p)for(;a.f.length;){var b=a.f.shift(),c=b[0],d=b[1],e=b[2],b=b[3];try{0==a.a?"function"==typeof c?e(c.call(void 0,a.b)):e(a.b):1==a.a&&("function"==typeof d?e(d.call(void 0,a.b)):b(a.b))}catch(h){b(h)}}}))}n.prototype.g=function(a){return this.c(void 0,a)};n.prototype.c=function(a,b){var c=this;return new n(function(d,e){c.f.push([a,b,d,e]);v(c)})};
function w(a){return new n(function(b,c){function d(c){return function(d){h[c]=d;e+=1;e==a.length&&b(h)}}var e=0,h=[];0==a.length&&b(h);for(var k=0;k<a.length;k+=1)u(a[k]).c(d(k),c)})}function x(a){return new n(function(b,c){for(var d=0;d<a.length;d+=1)u(a[d]).c(b,c)})};window.Promise||(window.Promise=n,window.Promise.resolve=u,window.Promise.reject=t,window.Promise.race=x,window.Promise.all=w,window.Promise.prototype.then=n.prototype.c,window.Promise.prototype["catch"]=n.prototype.g);}());

(function(){var k=!!document.addEventListener;function l(a,b){k?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function v(a){document.body?a():k?document.addEventListener("DOMContentLoaded",a):document.attachEvent("onreadystatechange",(function(){"interactive"!=document.readyState&&"complete"!=document.readyState||a()}))};function w(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function y(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=m;z(a)&&null!==a.a.parentNode&&b(a.g)}var m=a;l(a.b,c);l(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,H=!!window.FontFace;function I(){if(null===D){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}D=""!==a.style.font}return D}function J(a,b){return[a.style,a.weight,I()?a.stretch:"","100px",b].join(" ")}
B.prototype.load=function(a,b){var c=this,m=a||"BESbswy",x=b||3E3,E=(new Date).getTime();return new Promise(function(a,b){if(H){var K=new Promise(function(a,b){function e(){(new Date).getTime()-E>=x?b():document.fonts.load(J(c,c.family),m).then((function(c){1<=c.length?a():setTimeout(e,25)}),(function(){b()}))}e()}),L=new Promise(function(a,c){setTimeout(c,x)});Promise.race([L,K]).then((function(){a(c)}),(function(){b(c)}))}else v((function(){function q(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=
h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==r&&g==r&&h==r||f==t&&g==t&&h==t||f==u&&g==u&&h==u)),b=!b;b&&(null!==d.parentNode&&d.parentNode.removeChild(d),clearTimeout(G),a(c))}function F(){if((new Date).getTime()-E>=x)null!==d.parentNode&&d.parentNode.removeChild(d),b(c);else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=n.a.offsetWidth,
h=p.a.offsetWidth,q();G=setTimeout(F,50)}}var e=new w(m),n=new w(m),p=new w(m),f=-1,g=-1,h=-1,r=-1,t=-1,u=-1,d=document.createElement("div"),G=0;d.dir="ltr";y(e,J(c,"sans-serif"));y(n,J(c,"serif"));y(p,J(c,"monospace"));d.appendChild(e.a);d.appendChild(n.a);d.appendChild(p.a);document.body.appendChild(d);r=e.a.offsetWidth;t=n.a.offsetWidth;u=p.a.offsetWidth;F();A(e,(function(a){f=a;q()}));y(e,J(c,'"'+c.family+'",sans-serif'));A(n,(function(a){g=a;q()}));y(n,J(c,'"'+c.family+'",serif'));A(p,(function(a){h=
a;q()}));y(p,J(c,'"'+c.family+'",monospace'))}))})};window.FontFaceObserver=B;window.FontFaceObserver.prototype.check=window.FontFaceObserver.prototype.load=B.prototype.load;"undefined"!==typeof module&&(module.exports=window.FontFaceObserver);}());

/**
 * Get the value of a cookie
 * https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
 */
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
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
/**
 * Load HTML into the DOM
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 * @author Chris Ferdinandi
 * @param  {String|Node} html     The markup. If a string, must be enclosed in a single node (ex. <div>, <span>, etc.).
 * @param  {Node}        target   The node to place your HTML before or after.
 * @param  {Boolean}     after    If true, load markup after target node. Else, load before.
 * @param  {Function}    cb       Callback to run after method.
 * @return {Object}               Element in the DOM.
 */
var loadHTML = function ( html, target, after, cb ) {

	'use strict';

	// Sanity check
	if ( !html || !target ) return;

	// Get/create DOM elements
	var elem = html;
	if ( html.nodeType !== 1 ) {
		var div = document.createElement('div');
		div.innerHTML = '<p>x</p>' + html;
		elem = div.childNodes[1];
	}
	var location = after ? target.nextSibling : target;

	// Insert element into the DOM
	if ( !target ) return;
	target.parentNode.insertBefore( elem, location );

	// Run callback
	if ( cb && typeof(cb) === 'function' ) {
		cb();
	}

	return elem;

};
/**
 * Load styles or scripts inline in the DOM.
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 * @author Chris Ferdinandi
 * @param  {String}   elem The CSS or JS to load (with <style> or <script> tags).
 * @param  {Function} cb   Callback to run on completion.
 * @return {Object}        The inlined node.
 */
var loadInline = function ( elem, cb ) {
	'use strict';
	if ( !elem ) return; // Sanity check
	var head = document.head || document.getElementsByTagName('head')[0];
	var div = document.createElement('div');
	div.innerHTML = '<p>x</p>' + elem;
	head.appendChild( div.childNodes[1] );
	if (cb && typeof(cb) === 'function') {
		cb();
	}
	return div.childNodes[1];
};
/**
 * Load a JS file asynchronously.
 * @author @scottjehl, Filament Group, Inc.
 * @license MIT
 * @link https://github.com/filamentgroup/loadJS
 * @param  {String}   src URL of script to load.
 * @param  {Function} cb  Callback to run on completion.
 * @return {String}       The script URL.
 */
var loadJS = function ( src, cb ){
	'use strict';
	var ref = window.document.getElementsByTagName( 'script' )[ 0 ];
	var script = window.document.createElement( 'script' );
	script.src = src;
	ref.parentNode.insertBefore( script, ref );
	if (cb && typeof(cb) === 'function') {
		script.onload = cb;
	}
	return script;
};
/**
 * Move a node or its content in the DOM.
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 * @author Chris Ferdinandi
 * @param  {Node}     elem      Element to move.
 * @param  {Node}     target    The node to place the node before or after.
 * @param  {Boolean}  innerHTML If true, grabs markup inside node.
 * @param  {Boolean}  after     If true, load markup after target node. Else, load before.
 * @param  {Function} cb        Callback to run after method.
 * @return {Object|String}      Node/markup in the DOM.
 */
var moveElem = function ( elem, target, innerHTML, after, cb ) {

	'use strict';

	// Sanity check
	if ( !elem || !target ) return;

	// Get DOM elements
	// var el = document.querySelector( elem );
	var location = after ? target.nextSibling : target;

	// Move element/markup in the DOM
	if ( !elem || !target ) return;
	if ( innerHTML ) {
		var content = after ? target.innerHTML + elem.innerHTML : elem.innerHTML + target.innerHTML;
		target.innerHTML = content;
		if ( elem.parentNode ) {
			elem.parentNode.removeChild(elem);
		}
		elem = content;
	} else {
		target.parentNode.insertBefore( elem, location );
	}

	// Run callback
	if ( cb && typeof(cb) === 'function' ) {
		cb();
	}

	return elem;

};
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
/**
 * portalReady.js
 * Initialize scripts and run other methods after Portal is loaded and ready.
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 */

var portalReady = function ( fn ) {

	// Sanity check
	if ( typeof fn !== 'function' ) return;

	// If document is already loaded, run method
	if ( document.readyState === 'interactive' || document.readyState === 'complete' ) {
		return fn();
	}

	// Otherwise, wait until document is loaded
	document.addEventListener( 'DOMContentLoaded', fn, false );

};
/**
 * Remove stylesheets from the DOM.
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 * @param  {String} filename The name of the stylesheet to remove
 * @return {Object}          The stylesheet that was removed
 */
var removeCSS = function ( filename ) {

	'use strict';

	// Get all stylesheets
	var links = document.getElementsByTagName('link');
	var regex = new RegExp(filename);

	// Find and remove matching stylesheet
	for ( var i = links.length; i >= 0; i-- ) {
		if ( links[i] && links[i].href !== null && regex.test(links[i].href) ) {
			links[i].parentNode.removeChild(links[i]);
			return links[i];
		}
	}
};
/**
 * detectSVG.js
 * @description Adds .svg class to <html> element if SVGs are supported.
 * @version 1.2.0
 * @author Chris Ferdinandi
 * @license MIT
 */
;(function (window, document, undefined) {

	'use strict';

	// SVG feature detection
	var supports = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;

	// If SVG is supported, add `.svg` class to <html> element
	if ( !supports ) return;
	document.documentElement.className += (document.documentElement.className ? ' ' : '') + 'svg';

})(window, document);
/**
 * Wrap an element's contents in markup.
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 * @author Chris Ferdinandi
 * @param  {Node}     elem       Element to wrap in markup. Uses querySelector().
 * @param  {String}   wrap       Markup to wrap content in. Use {{content}} as content placeholder.
 * @param  {Boolean}  innerHTML  If true, grabs markup inside node.
 * @param  {Function} cb         Call back to run after method.
 * @return {Object}              Element in the DOM.
 */
var wrapElem = function ( elem, wrap, innerHTML, cb) {

	'use strict';

	// Sanity check
	if ( !elem || !wrap ) return;

	// Wrap element
	if ( !elem ) return;
	if ( innerHTML ) {
		wrap = wrap.replace( '{{content}}' , elem.innerHTML);
		elem.innerHTML = wrap;
	} else {
		var div = document.createElement('div');
		var elemClone = elem.cloneNode(true);
		div.appendChild( elemClone );
		wrap = wrap.replace( '{{content}}' , div.innerHTML);
		div.innerHTML = '<p>x</p>' + wrap;
		elem.parentNode.insertBefore( div.childNodes[1], elem );
		elem.parentNode.removeChild( elem );
	}

	// Run callback
	if ( cb && typeof(cb) === 'function' ) {
		cb();
	}

	return elem;

};
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
	portalReady((function () {

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


	}));


	/**
	 * Load true active state on sub nav links
	 */
	portalReady((function () {

		// Variables
		var links = document.querySelectorAll( '.sub ul a' );
		var url = location.protocol + '//' + location.host + location.pathname;
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

			if ( href === url.replace(/#([^\\s]*)/g, '') ) {
				activate( links[i] );
				return;
			}

		}

	}));


	/**
	 * Relocate footer
	 */
	portalReady((function () {
		moveElem( document.querySelector( '#footer' ), document.querySelector( '#page' ), false, true );
	}));


	/**
	 * Relocate footer navigation
	 */
	portalReady((function () {

		// Get footer
		var footer = document.querySelector( '#footer ul' );
		var navWrap = document.querySelector( '#nav-footer' );

		// Sanity check
		if ( !footer || !footer.querySelector( 'li.first' ) || !navWrap ) return;

		// Move footer navigation
		navWrap.innerHTML = '<ul class="list-inline list-inline-divided margin-bottom-large" id="nav-footer-content"></ul>';
		moveElem( footer, document.querySelector( '#nav-footer-content' ), true );

	}));


	/**
	 * Improve search form accessibility
	 */
	portalReady((function () {

		// Variables
		var fields = document.querySelectorAll( '#search-box, .search-form input[type="text"]' );
		var label = '<label class="screen-reader">Search</label>';

		// Loop through each search field
		for ( var i = 0, len = fields.length; i < len; i++ ) {
			fields[i].setAttribute( 'placeholder', 'Search...' ); // Add placeholder text
			loadHTML( label, fields[i] ); // Add hidden label for screen readers
		}

	}));


	/**
	 * Update RSS link in forums
	 */
	portalReady((function () {

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

	}));


	/**
	 * Add `http://` to URL fields on registration pages
	 */
	portalReady((function () {

		// Get URL fields
		var urls = document.querySelectorAll( '#applications-uri, #members-uri, #members-blog' );

		// Add `http://` to URL fields
		for ( var i = 0; i < urls.length; i++ ) {
			if ( urls[i].value !== '' ) continue;
			urls[i].value = 'http://';
		}

	}));


	/**
	 * Update document page title
	 */
	portalReady((function () {

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

	}));


	/**
	 * Remove empty paragraphs
	 */
	portalReady((function () {

		// Get and remove all empty paragraphs
		var pars = document.querySelectorAll('p');
		for (var i = 0; i < pars.length; i++) {
			if ( pars[i].innerHTML === '' ) {
				pars[i].parentNode.removeChild(pars[i]);
			}
		}

	}));

})(window, document);


/**
 * Undo default syntax highlighting
 * @type {Object}
 */
SyntaxHighlighter = {};
SyntaxHighlighter.all = function () {};
/**
 * zzz_setup.js
 * Add page setup scripts here
 */


/**
 * Remove default stylesheets
 */

;(function (window, document, undefined) {

	'use strict';

	// Get the current URL path
	var path = window.location.pathname; // Get the current URL path

	// Remove unused stylesheets
	removeCSS( 'localdev.css' ); // Remove localdev specific CSS. Do not use on production sites.
	removeCSS( 'Mashery-base.css' ); // Remove the base Mashery CSS
	removeCSS( 'print-defaults.css' ); // Remove the default print CSS

	// If the IODocs page, also remove IODocs specific CSS
	if ( /\/io-docs/.test( path ) ) {
		removeCSS( 'Iodocs/style.css' );
		removeCSS( 'alpaca.min.css' );
	}

})(window, document);


/**
 * Add a class to the <html> element based on the URL path
 */

;(function (window, document, undefined) {

    'use strict';

    // Get the current URL path
    var path = window.location.pathname;

    // Remove leading and trailing slashes
    if ( path.charAt(0) === '/' ) { path = path.substr(1); }
    if ( path.charAt( path.length - 1 ) === '/' ) { path = path.substr(0, path.length - 1); }

    // Remove /read/ from path
    path = path.replace( /\/read\//, '/' );

    // Create class
    var pathClass = path.replace( /\//g, '-' ).replace( /_/g, '-' ).replace( /\%20/g, '-' ).toLowerCase(); // Replace slashes and spaces with dashes
    if ( pathClass.substr( -5 ) === '-home' ) { pathClass = pathClass.substr( 0, pathClass.length - 5 ); } // Remove -home from end of string
    if ( pathClass.substr( -4 ) === 'home' ) { pathClass = pathClass.substr( 0, pathClass.length - 4 ); } // Remove -home from end of string
    if ( !pathClass || pathClass ===  ( '' || 'page' || 'home' )  ) { pathClass = 'landing'; } // Use special class for homepage
    var loggedIn = typeof mashery_info === 'undefined' || !mashery_info || !mashery_info.username ? ' is-logged-out' : ' is-logged-in';

    // Add classes to DOM
    document.documentElement.className += ' dom-' + pathClass + loggedIn;

})(window, document);