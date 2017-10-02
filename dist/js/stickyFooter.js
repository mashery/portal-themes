var stickyFooter = function (options) {

	//
	// Variables
	//

	// Defaults
	var defaults = {
		selector: '#app-wrapper #footer',
		initClass: 'js-sticky-footer'
	};
	var settings = defaults;

	// Placeholder for public methods
	var publicMethods = {};
	var app, push;


	//
	// Methods
	//

	/**
	 * Determine the document's height
	 * @returns {Number}
	 */
	var getDocumentHeight = function () {
		return Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);
	};

	/**
	 * Push footer to the bottom of the page
	 * @return {[type]} [description]
	 */
	publicMethods.pushFooter = function () {

		push.style.height = '';

		// Get distance from the bottom of the page
		var distance = getDocumentHeight() - parseInt(window.getComputedStyle(app).height, 10);

		// Adjust footer
		push.style.height = (distance < 1 ? '' : distance + 'px');

	};

	/**
	 * Debounce resize events
	 * @return {[type]} [description]
	 */
	var resizeDebounce = function () {
		window.requestAnimationFrame(publicMethods.pushFooter);
	};

	/**
	 * Destroy initialization
	 */
	publicMethods.destroy = function () {
		if (!app || !push) return;
		footer.style.marginTop = '';
		window.removeEventListener('resize', resizeDebounce, false);
		document.documentElement.classList.remove(settings.initClass);
		app = null;
		push.remove();
		push = null;
	};


	//
	// Inits & Event Listeners
	//

	// Destroy any previous initializations
	publicMethods.destroy();

	// Merge user options into defaults
	for (var key in options) {
		if (options.hasOwnProperty(key)) {
			settings[key] = options[key];
		}
	}

	// Get elements
	var footer = document.querySelector(settings.selector);
	app = document.querySelector('#app');
	push = document.createElement('div');
	if (!footer) return;

	// Inject push into the DOM
	footer.before(push);

	// Resize event listener
	window.addEventListener('resize', resizeDebounce, false);

	// Stick footer
	publicMethods.pushFooter();

	// Add init class
	document.documentElement.classList.add(settings.initClass);

};