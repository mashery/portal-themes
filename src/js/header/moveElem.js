/**
 * Move a node or its content in the DOM.
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