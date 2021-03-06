/**
 * Customize Blackbeard Downloads
 */
var customizer = function () {

	'use strict';

	//
	// Variables
	//

	var baseURL = 'https://api.github.com/repos/mashery/portal-themes/contents/dist/';
	var btnJS = document.querySelector('#download-custom-js');
	var btnCSS = document.querySelector('#download-custom-css');
	var size = document.querySelector('#download-size');
	var initCode = document.querySelector('#download-init');
	var savedCache = sessionStorage.getItem('portalCustomizerCache');
	var cache = savedCache ? JSON.parse(savedCache) : {};
	var isMin, minified, layout, plugins, scripts, styles, inits, events, scriptsSize, stylesSize, timerID;


	//
	// Methods
	//

	/**
	 * Render initialization code into the DOM
	 */
	var createInits = function () {

		// Generate code
		var code = '';
		if (inits.length > 0) {
			code += inits;
		}
		if (events.length > 0) {
			code +=
				'\n\n' +
				"window.addEventListener('portalAfterRender', function () {" + '\n' +
					'\t' + 'm$.loadJS(\'/files/' + layout + minified + '.js\', function () {' + '\n' +
						events +
					'\t' + '});' + '\n' +
				'}, false)';
		}

		// If no code, indicate this...
		if (code.length < 1) {
			initCode.innerHTML = '// No initialization needed...';
			return;
		}

		// Escape brackets and inject
		initCode.innerHTML = code.replace(new RegExp('<', 'g'), '&lt;').replace(new RegExp('>', 'g'), '&gt;').trim();

		// Highlight code
		if ('Prism' in window) {
			Prism.highlightAll();
		}

	};

	/**
	 * Get initialization code for plugins and components
	 */
	var getPluginInits = function () {

		// If no plugins are selected, create initialization code immediately
		if (plugins.length < 1) {
			createInits();
			return;
		}

		plugins.forEach(function (plugin) {

			// Get the plugin name
			var pluginName = plugin.getAttribute('value');

			// If plugin has inits
			if (plugin.classList.contains('has-inits')) {
				if (cache[baseURL + 'inits/' + pluginName + '.js']) {

					// Create inits
					inits += cache[baseURL + 'inits/' + pluginName + '.js'] + '\n\n';

					// Render initialization code
					createInits();

				} else {

					// Get initialization code
					atomic.ajax({
						url: baseURL + 'inits/' + pluginName + '.js'
					}).success(function (data) {

						// Create inits
						cache[baseURL + 'inits/' + pluginName + '.js'] = atob(data.content);
						inits += cache[baseURL + 'inits/' + pluginName + '.js'] + '\n\n';
						sessionStorage.setItem('portalCustomizerCache', JSON.stringify(cache));

						// Render initialization code
						createInits();

					}).error(function (data) {
						// Render initialization code
						createInits();
						console.error(pluginName + ' wasn\'t found');
					});

				}
			} else {
				// Render initialization code
				createInits();
			}

			// If plugin has event listeners
			if (plugin.classList.contains('has-events')) {
				if (cache[baseURL + 'events/' + pluginName + '.js']) {

					// Create inits
					events += '\t\t' + cache[baseURL + 'events/' + pluginName + '.js'].replace(new RegExp('\n', 'g'), '\n\t\t') + '\n';

					// Render initialization code
					createInits();

				} else {

					// Get event action
					atomic.ajax({
						url: baseURL + 'events/' + pluginName + '.js'
					}).success(function (data) {

						// Create inits
						cache[baseURL + 'events/' + pluginName + '.js'] = atob(data.content);
						events += '\t\t' + cache[baseURL + 'events/' + pluginName + '.js'].replace(new RegExp('\n', 'g'), '\n\t\t') + '\n';
						sessionStorage.setItem('portalCustomizerCache', JSON.stringify(cache));

						// Render initialization code
						createInits();

					}).error(function (data) {
						// Render initialization code
						createInits();
						console.error(pluginName + ' wasn\'t found');
					});

				}
			} else {
				// Render initialization code
				createInits();
			}

		});

	};

	/**
	 * Get initialization code for the selected theme
	 */
	var getThemeInits = function () {

		if (layout === 'diy') {

			// Add any plugins
			getPluginInits();

		} else if (cache[baseURL + 'inits/' + layout + '.js']) {

			// Create styles
			inits = cache[baseURL + 'inits/' + layout + '.js'];

			// Add any plugins
			getPluginInits();

		} else {

			atomic.ajax({
				url: baseURL + 'inits/' + layout + '.js'
			}).success(function (data) {

				// Create styles
				cache[baseURL + 'inits/' + layout + '.js'] = atob(data.content);
				inits = cache[baseURL + 'inits/' + layout + '.js'];
				sessionStorage.setItem('portalCustomizerCache', JSON.stringify(cache));

				// Add any plugins
				getPluginInits();

			}).error(function (data) {
				// Add any plugins
				getPluginInits();
				console.error(layout + ' wasn\'t found');
			});

		}
	};

	/**
	 * Convert the file size into kilobytes
	 * @param  {Number} size The size in bytes
	 * @return {String}      The size in kilobytes
	 */
	var prettySize = function (size) {
		return Math.round(100 * size / 1024) / 100 + 'kb';
	};

	/**
	 * Render the file download size information
	 */
	var displayDownloadSize = function () {
		var total = scriptsSize + stylesSize;
		var percentJS = Math.round(100 * scriptsSize / total) + '%';
		var percentCSS = Math.round(100 * stylesSize / total) + '%';
		size.innerHTML = '<p>Total Filesize: <strong>' + prettySize(total) + '</strong> (' + percentJS + ' JavaScript and ' + percentCSS + ' CSS)</p>';
	};

	/**
	 * Create URL to resume work with theme
	 * @return {String} The URL
	 */
	var createURL = function () {

		// Create the URL
		var url =
			'?compression=' + (isMin ? 'production' : 'development') +
			'&layout=' + layout +
			'&plugins=';
		var pluginNames = [];

		plugins.forEach(function (plugin) {
			pluginNames.push(plugin.value);
		});

		url += pluginNames.join('+');

		// If History API exists, replace state
		if (history.replaceState) {
			history.replaceState({}, null, url);
		}

		return url;

	};

	/**
	 * Create the file header
	 * @param  {String} filetype The file extension
	 * @return {String}          The header
	 */
	var createHeader = function (filetype) {
		var loc = window.location;
		var header =
			'/*! ' +
				layout + minified + '.' + filetype + ' | ' +
				'(c) ' + new Date().getFullYear() + ' TIBCO | ' +
				'MIT License | ' +
				loc.protocol + loc.hostname + loc.pathname + createURL() + ' ' +
			'*/' +
			'\n';
		return header;
	};

	/**
	 * Create the file download link
	 * @param  {Node}   btn  The button to trigger the download
	 * @param  {String} code The code to download
	 */
	var createDownload = function (btn, code) {

		// If there's no code to download
		if (code.length < 1) {
			btn.innerHTML = 'No ' + (btn.id === 'download-custom-js' ? 'JavaScript' : 'CSS') + ' Needed';
			return;
		}

		// Update button
		btn.classList.remove('disabled');
		btn.href = 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(createHeader((btn.id === 'download-custom-js' ? 'js' : 'css'))) + encodeURIComponent(code);
		btn.innerHTML = 'Download ' + (btn.id === 'download-custom-js' ? 'JavaScript' : 'CSS');
		btn.download = layout + minified + (btn.id === 'download-custom-js' ? '.js' : '.css');
		displayDownloadSize();

	};

	/**
	 * Update buttons and content areas while pulling from the API
	 */
	var setGeneratingStatus = function () {

		// Scripts
		btnJS.classList.add('disabled');
		btnJS.href = '';
		btnJS.innerHTML = 'Generating...';

		// Styles
		btnCSS.classList.add('disabled');
		btnCSS.href = '';
		btnCSS.innerHTML = 'Generating...';

		// Download Size
		size.innerHTML = '';

		// Initialization Code
		initCode.innerHTML = 'Generating...';

	};

	/**
	 * Get the overrides.css file
	 */
	var getOverrides = function () {
		if (layout === 'diy') {

			// Update the download button
			createDownload(btnCSS, styles);

		} else if (cache[baseURL + 'css/overrides' + minified + '.css']) {

			// Create scripts
			styles += cache[baseURL + 'css/overrides' + minified + '.css'].styles;
			stylesSize += cache[baseURL + 'css/overrides' + minified + '.css'].size;

			// Update the download button
			createDownload(btnCSS, styles);

		} else {

			// Update the download button
			createDownload(btnCSS, styles);

		}
	};

	/**
	 * Get the plugin and component code
	 */
	var getPlugins = function () {

		// If no plugins are selected, update buttons immediately
		if (plugins.length < 1) {
			createDownload(btnJS, scripts);
			createDownload(btnCSS, styles);
			getOverrides();
			return;
		}

		// Otherwise, get the plugins
		var last = plugins.length - 1;
		plugins.forEach(function (plugin, index) {

			// Get the plugin name
			var pluginName = plugin.getAttribute('value');

			// Get scripts
			if (plugin.classList.contains('has-js')) {
				if (cache[baseURL + 'js/' + pluginName + minified + '.js']) {

					// Create scripts
					scripts += cache[baseURL + 'js/' + pluginName + minified + '.js'].scripts;
					scriptsSize += cache[baseURL + 'js/' + pluginName + minified + '.js'].size;

					// Update the download button
					createDownload(btnJS, scripts);

				} else {

					atomic.ajax({
						url: baseURL + 'js/' + pluginName + minified + '.js'
					}).success(function (data) {

						// Create scripts
						cache[baseURL + 'js/' + pluginName + minified + '.js'] = {
							scripts: atob(data.content),
							size: data.size
						};
						scripts += cache[baseURL + 'js/' + pluginName + minified + '.js'].scripts;
						scriptsSize += cache[baseURL + 'js/' + pluginName + minified + '.js'].size;
						sessionStorage.setItem('portalCustomizerCache', JSON.stringify(cache));

						// Update the download button
						createDownload(btnJS, scripts);

					}).error(function (data) {
						// @todo
					});

				}
			} else {
				// Update the download button
				createDownload(btnJS, scripts);
			}

			// Get styles
			if (plugin.classList.contains('has-css')) {
				if (cache[baseURL + 'css/' + pluginName + minified + '.css']) {

					// Create scripts
					styles += cache[baseURL + 'css/' + pluginName + minified + '.css'].styles;
					stylesSize += cache[baseURL + 'css/' + pluginName + minified + '.css'].size;

					// Update the download button
					createDownload(btnCSS, styles);

				} else {

					atomic.ajax({
						url: baseURL + 'css/' + pluginName + minified + '.css'
					}).success(function (data) {

						// Create scripts
						cache[baseURL + 'css/' + pluginName + minified + '.css'] = {
							styles: atob(data.content),
							size: data.size
						};
						styles += cache[baseURL + 'css/' + pluginName + minified + '.css'].styles;
						stylesSize += cache[baseURL + 'css/' + pluginName + minified + '.css'].size;
						sessionStorage.setItem('portalCustomizerCache', JSON.stringify(cache));

						// Update the download button
						createDownload(btnCSS, styles);

					}).error(function (data) {
						// @todo
					});

				}
			} else {
				// Update the download button
				createDownload(btnCSS, styles);
			}

			if (index === last) {
				getOverrides();
			}

		});

	};

	/**
	 * Get the base layout CSS
	 */
	var getLayout = function () {

		if (layout = 'diy') {
			getPlugins();
		} else if (cache[baseURL + 'css/' + layout + minified + '.css']) {

			// Create styles
			styles = cache[baseURL + 'css/' + layout + minified + '.css'].styles;
			stylesSize += cache[baseURL + 'css/' + layout + minified + '.css'].size;

			// Add any plugins
			getPlugins();

		} else {

			atomic.ajax({
				url: baseURL + 'css/' + layout + minified + '.css'
			}).success(function (data) {

				var stylesheets = atob(data.content).split('/*! SPLIT: Overrides */');

				// Create styles
				cache[baseURL + 'css/' + layout + minified + '.css'] = {
					styles: stylesheets[0].trim(),
					size: data.size
				};
				if (stylesheets[1]) {
					cache[baseURL + 'css/overrides' + minified + '.css'] = {
						styles: stylesheets[1].trim(),
						size: 0
					};
				}
				styles += cache[baseURL + 'css/' + layout + minified + '.css'].styles;
				stylesSize += cache[baseURL + 'css/' + layout + minified + '.css'].size;
				sessionStorage.setItem('portalCustomizerCache', JSON.stringify(cache));

				// Add any plugins
				getPlugins();

			}).error(function (data) {
				// @todo
			});

		}
	};

	/**
	 * Generate code based on user selections
	 */
	var generateCode = function () {

		// Temporarily disable download buttons
		setGeneratingStatus();

		// Check if code should be minified or not
		isMin = document.querySelector('input[name="compression"]:checked').getAttribute('value') === 'production' ? true : false;
		minified = isMin ? '.min' : '';

		// Get the layout and plugins
		layout = document.querySelector('input[name="layout"]:checked').getAttribute('value');
		plugins = document.querySelectorAll('input[name="plugins"]:checked');

		// Reset scripts and styles
		scripts = '';
		styles = '';
		inits = '';
		events = '';
		scriptsSize = 0;
		stylesSize = 0;

		// Get the layout code
		getLayout();

		// Get initialization code
		getThemeInits();

	};

	/**
	 * Debounce code generation for performance
	 */
	var generateCodeDebounce = function () {
		if (timerID) {
			clearTimeout(timerID);
		}
		timerID = setTimeout(generateCode, 500);
	};

	/**
	 * Get the URL parameters
	 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
	 * @param  {String} url The URL
	 * @return {Object}     The URL parameters
	 */
	var getParams = function (url) {
		var params = {};
		var parser = document.createElement('a');
		parser.href = url;
		var query = parser.search.substring(1);
		var vars = query.split('&');
		for (var i=0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			params[pair[0]] = decodeURIComponent(pair[1]);
		}
		return params;
	};

	var setCodeFromUrl = function () {
		var params = getParams(window.location.href);

		// Set compression
		if (params.compression && params.compression.length > 0) {
			var compression = document.querySelector('input[name="compression"][value="' + params.compression + '"]');
			if (compression) {
				compression.setAttribute('checked', 'checked');
			}
		}

		// Set layout
		if (params.layout && params.layout.length > 0) {
			var layout = document.querySelector('input[name="layout"][value="' + params.layout + '"]');
			if (layout) {
				layout.setAttribute('checked', 'checked');
			}
		}

		// Set plugins
		if (params.plugins && params.plugins.length > 0) {
			var plugins = params.plugins.split('+');
			plugins.forEach(function (pluginName) {
				var plugin = document.querySelector('input[name="plugins"][value="' + pluginName + '"]');
				if (plugin) {
					plugin.setAttribute('checked', 'checked');
				}
			});
		}

	};

	/**
	 * Handle click events
	 * @param {Event} event  The click event
	 */
	var clickHandler = function (event) {

		// Only run on customizer options
		if (!event.target.closest('input[name="compression"], input[name="layout"], input[name="plugins"]')) return;

		// Get the theme and components
		generateCodeDebounce();

	};


	//
	// Inits & Event Listeners
	//

	// If not the customizer page, remove event listeners and bail
	if (!btnJS || !btnCSS) {
		document.removeEventListener('click', clickHandler, false);
		return;
	}

	// Handle events
	document.addEventListener('click', clickHandler, false);
	// document.addEventListener('change', changeHandler, false);

	// Setup initial files
	setCodeFromUrl();
	generateCodeDebounce();

};