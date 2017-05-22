/**
 * fullWidth.js
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 * @description Make page full-width (no padding or centering)
 * @version 0.0.1
 * @author  Chris Ferdinandi
 */
var fullWidth = function ( hideH1 ) {

	'use strict';

	// Feature test
	if ( !document.querySelector || !window.addEventListener ) return;

	// Variables
	var meta = document.querySelector( '.section-meta' );
	var edit = document.querySelector( '.section-menu .edit' );
	var h1 = document.querySelector( 'h1.first' );

	// Go full width
	document.documentElement.classList.add( 'dom-full-width' );

	// Wrap elements in container class
	if ( meta ) {
		wrapElem( meta, '<div class="container">{{content}}</div>' );
	}
	if ( edit ) {
		wrapElem( edit.parentNode.parentNode, '<div class="container">{{content}}</div>' );
	}
	if ( h1 ) {

		// If enabled, hide the primary h1 element
		if ( hideH1 ) {
			h1.style.display = 'none';
			h1.style.visibility = 'hidden';
		}

		wrapElem( h1, '<div class="container">{{content}}</div>' );

	}

};