/**
 * createDropdown.js
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 * @description  Dynamically create dropdown menus
 * @version  1.0.0
 * @author  Chris Ferdinandi
 * @param  {string} target    The (case insensitive) text label of the menu item that you'd like to add the dropdown to. Ex. 'Try our APIs'
 * @param  {array}  dropdown  An array of objects with the dropdown menu data. Ex. [{text: 'Something', url: '#'}, {text: 'Something Else', url: '#'}]
 * @param  {string} nav       Selector for the nav [optional]
 */
var createDropdown = function ( target, dropdown, nav ) {

	'use strict';

	// Feature test
	var supports = 'querySelector' in document;
	if ( !supports ) return;

	// Sanity check
	if ( !target || !dropdown ) return;

	// Variables
	nav = nav ? nav : document.querySelector( '#nav-1-content' );
	var items = nav.querySelectorAll( 'a' );
	var menu;

	// Create menu from dropdown array
	var createMenu = function () {
		menu = document.createElement( 'div' );
		menu.className = 'dropdown-menu dropdown-right';
		menu.setAttribute( 'data-dropdown-menu', true );
		for ( var i = 0, len = dropdown.length; i < len; i++ ) {
			menu.innerHTML += '<li><a href="' + dropdown[i].url + '">' + dropdown[i].text + '</a></li>';
		}
		menu.innerHTML = '<ul>' + menu.innerHTML + '</ul>';
	};

	// Add attributes to the parent
	var addAttributes = function ( elem ) {
		elem.parentNode.insertBefore( menu, items[i].nextSibling );
		elem.parentNode.className += ' dropdown';
		elem.parentNode.setAttribute( 'data-dropdown', true );
	};

	// Locate the nav item and insert the menu
	for ( var i = 0, len = items.length; i < len; i++ ) {
		if ( items[i].innerHTML.trim().toLowerCase() !== target.toLowerCase() ) continue;
		createMenu();
		addAttributes( items[i] );
		break;
	}

	// Initialize dropdowns
	drop.init({
		activeClass: 'drop-active',
	});

};