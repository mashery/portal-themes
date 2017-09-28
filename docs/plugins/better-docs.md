# Better Docs

Create beautiful, single-page documentation with toggleable code examples. Inspired by [Stripe](https://stripe.com/docs/api) and [PayPal's](https://developer.paypal.com/docs/api/) API documentation, and the [Slate open source project](https://github.com/lord/slate).

[View the demo.](/docs/plugins/Better_Docs/demo/)

<div id="plugin-note"></div>



## Getting Started

### 1. Add the markup to your page.

Better docs automatically pulls `<pre>` and `<blockquote>` elements over to the right side of the page. You can write your docs in true HTML, use the WYSIWIG editor, or use markdown.

Code examples wrapped in `<pre>` elements can also be toggled, so the developer can pick their language and only see examples in that language. Make sure to add a language class to your `<pre>` elements for this to work.

Code examples should be placed *above* the descriptive text for proper alignment.

**Markdown**

	This example API documentation page was created with Better Docs. Feel free to edit it and use it as a base for your own API's documentation.

	## Authentication

	> To authorize, use this code:

	```bash
	# With shell, you can just pass the correct header with each request
	curl "api_endpoint_here"
	  -H "Authorization: meowmeowmeow"
	```

	```ruby
	require 'kittn'

	api = Kittn::APIClient.authorize!('meowmeowmeow')
	Make sure to replace meowmeowmeow with your API key.
	```

	```python
	import kittn

	api = kittn.authorize('meowmeowmeow')
	```

	```js
	const kittn = require('kittn');

	let api = kittn.authorize('meowmeowmeow');
	```

	>Make sure to replace meowmeowmeow with your API key.

**HTML**

```html
<p>This example API documentation page was created with Better Docs. Feel free to edit it and use it as a base for your own API's documentation.</p>

<h2>Authentication</h2>

<blockquote>To authorize, use this code:</blockquote>

<pre class="lang-bash"><code># With shell, you can just pass the correct header with each request
curl "api_endpoint_here"
  -H "Authorization: meowmeowmeow"</code></pre>

<pre class="lang-ruby"><code>
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
Make sure to replace meowmeowmeow with your API key.</code></pre>

<pre class="lang-python"><code>
import kittn

api = kittn.authorize('meowmeowmeow')</code></pre>

<pre class="lang-javascript"><code>
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');</code></pre>

<blockquote>Make sure to replace meowmeowmeow with your API key.</blockquote>
```

### 2. Add a programming language toggle to your markup.

Add an empty div with the `.better-docs-nav` class. Your language toggle menu will automatically be injected here.

To make it sticky (it will remain in the upper right hand corner as users scroll down the page), add the `.better-docs-nav-sticky` class, too.

```html
<div class="better-docs-nav better-docs-nav-sticky"></div>
```

You can include as many of these as you want in your markup. They'll update together, meaning that changing the language on one updates all of them and toggles programming languages through the documentation. You may want just one of them at the top of the page, or one above every code example.

### 3. Initialize Better Docs.

Initialize Better Docs in a `portalAfterRender` event. You need to pass in the seletor for your content as the first argument (with the standard portal layouts, this is typically the `.content` class).

You also need to pass in a few options as an object for the second argument.

`langs` are the languages you want to support. Each language needs a `selector` (the language name that appears after `lang-` or `language-` on the `<pre>` element class), and the `title` you want to appear in the language selector.

You should also specify a `langDefault`, the language that Better Docs will show by default when the page loads.

```js
window.addEventListener('portalAfterRender', function (event) {
	var docs = new BetterDocs('.content', {
		langs: {
			bash: {
				selector: 'bash',
				title: 'Bash'
			},
			js: {
				selector: 'javascript, js',
				title: 'JavaScript',
			},
			ruby: {
				selector: 'ruby',
				title: 'Ruby'
			},
			python: {
				selector: 'python',
				title: 'Python'
			}
		},
		langDefault: 'js'
	});
}, false);
```

### 4. Add a self-destruct

To prevent Better Docs styles from impacting other documentation pages, you'll need to destroy your initialization on other pages. Add a self-destruction listener to your `portalAfterRender` event.

```lang-js
window.addEventListener('portalAfterRender', function (event) {
	var docs = new BetterDocs('.content', {
		// ...
	});

	// Self-Destruct
	window.addEventListener('portalBeforeRenderAjax', function destroyBetterDocs () {
		docs.destroy();
		window.removeEventListener('portalBeforeRender', destroyBetterDocs, false);
	}, false);
}, false);
```

And that's it, you're done. Nice work!


## Options and Settings

Better Docs includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options into Better Docs on initialization.

```javascript
var docs = new BetterDocs('.content', {

	// Only run on certain pages
	// This should match a window.mashery.contentType or window.mashery.contentId
	restrictToPages: 'docs',

	// Table of Contents
	// Automatically generated
	tocSelector: 'h2, h3, h4, h5, h6', // Headings to use to generate table fo contents
	tocHeading: '', // A heading to include above the table of contents
	tocLocation: '#nav-docs', // Where to inject the table of contents (defaults to below the current page navigation)
	currentPageSelector: '.current-page', // Selector for the current page in the docs sub navigation
	tocLocationReplace: false, // If true, replaces the navigation menu entirely

	// Languages
	langs: null, // The languages to include in the toggle menu
	langDefault: null, // The language to show by default
	langsNav: '.better-docs-nav', // The selector for the language toggle menu

	// Styles
	wideLayout: true, // Use a wide layout (docs and examples side by side) instead of a tranditional stacked layout
	wideLayoutBg: true, // Include a background color behind the code examples
	initClass: 'better-docs', // The class to add to the document element after Better Docs loads
	wideLayoutClass: 'better-docs-wide', // The class to add when wide layouts are enabled
	wideLayoutBgClass: 'better-docs-wide-bg', // The class to add when background color for wide layouts is enabled
	contentClassSuffix: '-content' // The suffix to add to the wide layout classes for the content area

});
```

### Use Better Docs methods in your own scripts

You can also call Better Docs methods in your own scripts.

#### toggleLang()
Toggle a programming language in the examples.

```javascript
var docs = new BetterDocs('.content', {
	// ...
});
docs.toggleLang = function ('ruby');
```

#### destroy()
Destroy the initialization.

```javascript
var docs = new BetterDocs('.content', {
	// ...
});
docs.destroy();
```