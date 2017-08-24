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