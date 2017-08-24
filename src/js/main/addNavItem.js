/**
 * addNavItem.js
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 * @description  Add a navigation item to the menu if all 6 spots are used up
 * @version  1.0.0
 * @author  Chris Ferdinandi
 * @param {string}   target  The (case insensitive) text label of the menu item that you'd like to add the item before or after. Ex. 'Try our APIs'
 * @param {string}   text    The text for the menu item
 * @param {string}   url     The URL for the new menu item
 * @param {boolean]} before  If true, place new item before target instead of after it [optional]
 * @param {string}   nav     Selector for the nav [optional]
 */
var addNavItem = function ( target, text, url, before, nav ) {

	'use strict';

	// Feature test
	var supports = 'querySelector' in document;
	if ( !supports ) return;

	// Sanity check
	if ( !target || !text || !url ) return;

	// Variables
	nav = nav ? nav : document.querySelector( '#nav-1-content' );
	var items = nav.querySelectorAll( 'a' );
	var menu;

	// Create menu from dropdown array
	function createMenu () {
		menu = document.createElement( 'li' );
		menu.innerHTML = '<a href="' + url + '">' + text + '</a>';
	}

	// Locate the nav item and insert the menu
	for ( var i = 0, len = items.length; i < len; i++ ) {
		if ( items[i].innerHTML.trim().toLowerCase() !== target.toLowerCase() ) continue;
		createMenu();
		var location = before ? items[i].parentNode : items[i].parentNode.nextSibling;
		items[i].parentNode.parentNode.insertBefore( menu, location );
		break;
	}

};