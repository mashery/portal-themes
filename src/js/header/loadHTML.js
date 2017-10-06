/**
 * Load HTML into the DOM
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