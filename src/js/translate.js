/*!
 * translate.js v1.0.0
 * Provide multi-language portal suport
 * (c) 2017 TIBCO Software Inc.
 * Written by Chris Ferdinandi
 * All Rights Reserved
 */
 (function (root, factory) {
 	if ( typeof define === 'function' && define.amd ) {
 		define([], function () {
 			return factory(root);
 		});
 	} else if ( typeof exports === 'object' ) {
 		module.exports = factory(root);
 	} else {
 		root.Translate = factory(root);
 	}
 })(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

	'use strict';

	//
	// Shared Variables
	//

	// The default values
	var defaults = {
		default: null, // The default language [optional]
		activeClass: 'active', // The class to add to active language blocks and toggles
		langBlockSelector: '.translate', // The selector for language blocks
		langBlockPrefix: '.translate-', // The selector prefix for language-specific language blocks
		contentSelectors: null, // The selectors for targeted content translation
		initClass: 'js-translate', // The class to add to the document when the script initializes
		dictionary: [], // Your disctionary of translation
	};


	//
	// Shared Methods
	//

	/*!
	 * Merge two or more objects together.
	 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param   {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
	 * @param   {Object}   objects  The objects to merge together
	 * @returns {Object}            Merged values of defaults and options
	 */
	var extend = function () {

		// Variables
		var extended = {};
		var deep = false;
		var i = 0;

		// Check if a deep merge
		if (Object.prototype.toString.call( arguments[0] ) === '[object Boolean]') {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function (obj) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					// If property is an object, merge properties
					if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
						extended[prop] = extend(extended[prop], obj[prop]);
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for (; i < arguments.length; i++) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	/**
	 * Get all text nodes within a container
	 * @param  {Node} node The parent node to search within
	 * @return {Array}     The text nodes
	 */
	var getTextNodes = function (node){
		var allNodes = [];
		for (node = node.firstChild; node; node = node.nextSibling) {
			if (node.nodeType === 3 && !node.parentElement.matches('script, [data-translate]')) {
				allNodes.push(node);
			} else {
				allNodes = allNodes.concat(getTextNodes(node));
			}
		}
		return allNodes;
	};


	//
	// Constructor
	// Can be named anything you want
	//

	var Constructor = function (options) {

		//
		// Unique Variables
		//

		var translate = {}; // Placeholder for the public APIs
		var settings; // Local settings
		var currentLang; // The currently selected language


		//
		// Unique Methods
		//

		/**
		 * Merge user options into defaults
		 * @param  {Object} options The user options
		 */
		translate.updateOptions = function (options) {
			settings = extend(defaults, options || {});
		};

		/**
		 * Save the chosen language into local storage
		 * @param  {String} lang The language
		 */
		translate.saveLang = function (lang) {
			localStorage.setItem('translateLang', lang);
		};

		/**
		 * Get the saved language from local storage
		 * @return {String} lang The language
		 */
		translate.getSavedLang = function () {
			return localStorage.getItem('translateLang');
		};

		/**
		 * Remove the saved language from local storage
		 */
		translate.removeSavedLang = function () {
			localStorage.removeItem('translateLang');
		}

		/**
		 * Set the current language
		 * @param {String} lang The language
		 */
		translate.setCurrentLang = function (lang) {

			// If no language is provided, set a default
			if (!lang) {

				// If there's no dictionary to use, bail
				if (settings.dictionary.length < 1) return;

				// Otherwise, get the first language of the first definition and use that
				for (var i = 0; i < settings.dictionary.length; i++) {
					for (var key in settings.dictionary[i]) {
						lang = key;
						break;
					}
					break;
				}

				// Set the settings default to this language
				settings.default = lang;

			}

			// Update the current language
			currentLang = lang;

			// Save the chosen language in local storagea
			translate.saveLang(lang);

		};

		/**
		 * Show any content blocks for the current language (and hide all others)
		 * @param  {String} lang The selected language
		 */
		translate.toggleLangBlock = function (lang) {

			// Hide active lang blocks
			document.querySelectorAll(settings.langBlockSelector + '.' + settings.activeClass).forEach(function (block) {
				block.classList.remove(settings.activeClass);
			});

			// Show new lang blocks
			document.querySelectorAll(settings.langBlockPrefix + lang).forEach(function (block) {
				block.classList.add(settings.activeClass);
			});

		};

		/**
		 * Translate targeted content into the new language
		 * @param  {Node|String} content  The content area to translate
		 * @param  {String}      lang     The selected language
		 */
		translate.translateContent = function (content, lang) {

			// Make sure definitions exist
			if (settings.dictionary.length < 1) return;

			// Get content if only a selector
			content = typeof content === 'string' ? document.querySelector(content) : content;

			// Get all of the text nodes in the content area
			var textNodes = getTextNodes(content);
			if (textNodes.length < 1) return;

			// Translate each text node
			settings.dictionary.forEach(function (definition) {

				// If the selected or current language don't exist for this definition, bail
				if (!definition[lang] || !definition[currentLang]) return;

				// Get all matching strings
				var matches = textNodes.filter(function (text) {
					return text.textContent.trim() === definition[currentLang].trim();
				});

				// Translate all matching nodes
				matches.forEach(function (match) {
					match.textContent = definition[lang];
				});

			});

		};

		/**
		 * Translate all content areas
		 * @param  {String} lang The selected language
		 */
		var translateContentAreas = function (lang) {

			// If there are not content areas to translate, bail
			if (!settings.contentSelectors) return;

			// Translate the content of each content area
			document.querySelectorAll(settings.contentSelectors).forEach(function (content) {
				translate.translateContent(content, lang);
			});

		};

		/**
		 * Activate the toggle for the currently selected language
		 * @param  {String} lang   The selected language
		 * @param  {Node}   toggle The toggle for the language
		 */
		translate.activateToggle = function (lang, toggle) {

			// Deselected any currently active toggles
			document.querySelectorAll('[data-translate="' + currentLang + '"].' + settings.activeClass).forEach(function (currentToggle) {
				currentToggle.classList.remove(settings.activeClass);
			});

			// Activate the toggle for the currently selected language
			if (toggle) {
				toggle.classList.add(settings.activeClass);
			}

		};

		/**
		 * Run a translation
		 * @param  {String} lang   The selected language
		 * @param  {Node}   toggle The toggle for the language
		 */
		translate.run = function (lang, toggle) {

			// Activate toggle
			translate.activateToggle(lang, toggle);

			// Only run if language changes
			if (lang === currentLang) return;

			// Toggle lang block
			translate.toggleLangBlock(lang);

			// Translate content areas
			translateContentAreas(lang);

			// Update the currentLang
			translate.setCurrentLang(lang);

		};

		/**
		 * Handle click events
		 * @param  {Event} event  The click event
		 */
		var clickHandler = function (event) {

			// Get the selected language
			var lang = event.target.getAttribute('data-translate');
			if (!lang) return;

			// Prevent default link/button behavior
			event.preventDefault();

			// Run translation
			translate.run(lang, event.target);

		};

		/**
		 * Run a translation on Ajax page loads
		 */
		var ajaxHandler = function () {
			translate.run(currentLang, document.querySelector('[data-translate="' + currentLang + '"]'));
		};

		/**
		 * Destroy the current instantiation
		 */
		translate.destroy = function () {

			// If plugin isn't already initialized, stop
			if (!settings) return;

			// Reset to the default language
			translate.run(settings.default, document.querySelector('[data-translate="' + settings.default + '"]'));

			// Remove event listeners
			document.removeEventListener('click', clickHandler, false);
			window.removeEventListener('portalAfterRenderAjax', ajaxHandler, false);

			// Remove saved language
			translate.removeSavedLang();

			// Remove init class
			document.documentElement.classList.remove(settings.initClass);

			// Reset variables
			settings = null;

		};

		/**
		 * Initialize the plugin
		 */
		translate.init = function (options) {

			// Merge options into defaults
			translate.updateOptions(options);

			// Add init class
			document.documentElement.classList.add(settings.initClass);

			// Check for a saved language
			var saved = translate.getSavedLang();

			// Set the current language
			translate.setCurrentLang(settings.default);

			// Activate the current lang
			var lang = saved ? saved : currentLang;
			translate.run(lang, document.querySelector('[data-translate="' + lang + '"]'));

			// Listen for translation events
			document.addEventListener('click', clickHandler, false);
			window.addEventListener('portalAfterRenderAjax', ajaxHandler, false);

		};

		// Initialize the plugin
		translate.init(options);

		// Return the public APIs
		return translate;

	};


	//
	// Return the constructor
	//

	return Constructor;

});