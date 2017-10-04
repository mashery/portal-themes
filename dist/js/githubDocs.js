/*!
 * githubDocs.js v1.0.1
 * Load documentation from GitHub
 * (c) 2017 TIBCO Software Inc.
 * Written by Chris Ferdinandi
 * All Rights Reserved
 */
var githubDocs = function (options) {

	'use strict';

	// Sanity check
	if (!window.mashery.globals.github) return;

	// Variables
	var defaults = {
		selector: '.content',
		user: null,
		repo: null,
		root: '',
		runScripts: false,
		loading: '<p>Loading...</p>',
		failMessage: '<p>Unable to load content.</p>'
	};
	var settings = m$.extend(defaults, options || {});
	if (!settings.user || !settings.repo) return;
	var main = document.querySelector(settings.selector);
	if (!main) return;

	// Add loading text
	main.innerHTML = settings.loading;

	var renderDocs = function (content) {

		// Convert markdown to HTML
		main.innerHTML = m$.convertMarkdown(content);

		// If inline scripts should be run, run them
		if (settings.runScripts) {
			main.querySelectorAll('script').forEach((function (script) {
				var func = new Function(script.innerHTML);
				func();
			}));
		}

		// Fix the location
		m$.fixLocation();

		// Syntax highlight code
		if ('Prism' in window) {
			Prism.highlightAll();
		}

		m$.emitEvent('portalAfterGitHubRender');

	};

	// Get the docs
	var docs = sessionStorage.getItem('portalGHDocs_' + window.mashery.contentId);
	if (docs) {
		renderDocs(docs);
	} else {

		atomic.ajax({
			url: 'https://api.github.com/repos/' + settings.user + '/' + settings.repo + '/contents/' + settings.root + mashery.globals.github
		}).success((function (data) {
			var content = window.atob(data.content);
			renderDocs(content);
			sessionStorage.setItem('portalGHDocs_' + window.mashery.contentId, content);
		})).error((function (data) {
			main.innerHTML = settings.failMessage;
			m$.emitEvent('portalAfterGitHubError');
		}));

	}

};