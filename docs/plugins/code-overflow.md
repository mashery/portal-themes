# Code Overflow

Adds horizontal scrolling to your code examples.

**Default Code Example**

```lang-js
// Update the primary navigation
portalOptions.templates.primaryNav = function () {
	var template =
		'<div class="nav-primary nav-wrap nav-collapse" id="nav-primary">' +
			'<div class="container padding-top-small padding-bottom-small">' +
				'<a id="logo" class="logo margin-bottom" href="/">{{content.logo}}</a>' +
				'<a role="button" class="nav-toggle" id="nav-primary-toggle" data-nav-toggle="#nav-primary-menu" href="#">{{content.menuToggle}}</a>' +
				'<div class="nav-menu" id="nav-primary-menu">' +
					'<ul class="nav" id="nav-primary-list">' +
						'{{content.navItemsPrimary}}' +
					'</ul>' +
					'<ul class="nav-user-list" id="nav-user-list">' +
						'{{content.navItemsUser}}' +
					'</ul>' +
					'{{content.searchForm}}' +
					(mashery.contentType === 'docs' ? '<h2 class="margin-top">In The Docs</h2><ul class="nav-docs" id="nav-docs">{{content.secondary}}</ul>' : '') +
				'</div>' +
			'</div>' +
		'</div>';
	return template;
};
```

**Code Overflow**

<pre class="lang-js"><code>// Update the primary navigation
portalOptions.templates.primaryNav = function () {
	var template =
		'&lt;div class="nav-primary nav-wrap nav-collapse" id="nav-primary"&gt;' +
			'&lt;div class="container padding-top-small padding-bottom-small"&gt;' +
				'&lt;a id="logo" class="logo margin-bottom" href="/"&gt;{{content.logo}}&lt;/a&gt;' +
				'&lt;a role="button" class="nav-toggle" id="nav-primary-toggle" data-nav-toggle="#nav-primary-menu" href="#"&gt;{{content.menuToggle}}&lt;/a&gt;' +
				'&lt;div class="nav-menu" id="nav-primary-menu"&gt;' +
					'&lt;ul class="nav" id="nav-primary-list"&gt;' +
						'{{content.navItemsPrimary}}' +
					'&lt;/ul&gt;' +
					'&lt;ul class="nav-user-list" id="nav-user-list"&gt;' +
						'{{content.navItemsUser}}' +
					'&lt;/ul&gt;' +
					'{{content.searchForm}}' +
					(mashery.contentType === 'docs' ? '&lt;h2 class="margin-top"&gt;In The Docs&lt;/h2&gt;&lt;ul class="nav-docs" id="nav-docs"&gt;{{content.secondary}}&lt;/ul&gt;' : '') +
				'&lt;/div&gt;' +
			'&lt;/div&gt;' +
		'&lt;/div&gt;';
	return template;
};</code></pre>