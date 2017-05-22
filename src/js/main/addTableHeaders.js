/**
 * addTableHeaders.js
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 * @description Add table headers that are missing from the GUI generated tables
 * @version  1.0.0
 * @author Chris Ferdinandi
 *
 */
var addTableHeaders = function () {

	'use strict';

	// Feature test
	var supports = 'querySelector' in document;
	if ( !supports ) return;

	// Variables
	var tables = document.querySelectorAll( 'table' );


	/**
	 * Get the closest matching element up the DOM tree.
	 * @param  {Element} elem     Starting element
	 * @param  {String}  selector Selector to match against (class, ID, data attribute, or tag)
	 * @return {Boolean|Element}  Returns null if not match found
	 */
	var getTbody = function ( elem ) {
		for ( ; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode ) {
			if ( elem.tagName.toLowerCase() === 'tbody' ) {
				return elem;
			}
		}
		return null;
	};


	for (var i = 0; i < tables.length; i++) {

		// Check if a table head already exists
		var thead = tables[i].querySelector( 'thead' );
		if ( thead ) continue;

		// Get the first table row and conver it to a thead
		var row = tables[i].querySelector('tr');
		var tbody = getTbody( row );
		if ( !row || !tbody ) continue;
		thead = document.createElement('thead');
		thead.innerHTML = '<tr>' + row.innerHTML + '</tr>';
		console.log(tbody.parentNode);
		tbody.parentNode.insertBefore( thead, tbody );
		row.parentNode.removeChild( row );
	}

};