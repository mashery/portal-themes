/**
 * removeMasheryApiSelection.js
 * @description Overrides and removes MasheryApiSelection.js, which is causing some unintended behaviors
 * @version  1.0.0
 * @author Chris Ferdinandi
 */

;(function (window, document, undefined) {

	'use strict';

	// Variables
	var scripts = document.getElementsByTagName('script'); // Get all scripots
	var defs = document.getElementsByTagName('dd'); // Get all <dd> elements

	/**
	 * Loop through objects, arrays, and nodelists
	 * Copyright 2014 @todomotto https://github.com/toddmotto/foreach
	 * @param  {Array|NodeList|Object}  collection The elements to loop through
	 * @param  {Function}               callback   The function to run on each loop
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0; i < collection.length; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	// Remove MasheryApiSelection.js from DOM
	forEach(scripts, function (script) {
		if ( !script || !script.src || !/MasheryApiSelection.js/.test( script.src ) ) return;
		script.parentNode.removeChild(script);
	});

	// Reset display of <dd> to block and remove click event that hides it
	forEach(defs, function (def, index) {

		// Get the <dd> that MasheryApiSelection hid
		if ( def.style.display === 'none' ) {

			// Grab the checkbox that's toggling it and clone it
			var toggle = defs[index - 1];
			var toggleNew = toggle.cloneNode(true);
			var parent = toggle.parentNode;

			// Reset visibility on the <dd> and replace the toggle with the clone
			// (Clones do not carry over click events)
			def.style.display = '';
			parent.insertBefore(toggleNew, toggle);
			parent.removeChild(toggle);

		}

	});

})(window, document);