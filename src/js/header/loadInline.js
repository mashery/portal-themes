/**
 * Load styles or scripts inline in the DOM.
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