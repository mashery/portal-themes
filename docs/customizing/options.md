# Options & Settings

Mashery Portal 2 let's you customize and configure a variety of options using the `portalOptions` JavaScript variable.

All of the available options and settings are detailed alphabetically below.

## The Options

Configure your options under `Manage > Portal > Portal Settings` in the `Inline JavaScript > Body JavaScript` area.

### Ajax page loads
Whether to load pages async or with a page reload

```js
// If true, use Ajax
portalOptions.ajax = true;

// Selectors to ignore if clicked.
// Accepts any valid CSS selector.
// Use comma separated list for multiple selectors.
portalOptions.ajaxIgnore = null;

// Text to display in title while loading page
portalOptions.ajaxLoading = 'Loading...';
```

### Active Page Class
Class for links that point to the current page. This is applied to links in the primary, secondary, and user navigation menus, as well as the documentation submenu on documentation pages.

```js
portalOptions.currentPageClass = 'current-page';
```

### Blog Excerpt Length
How long the excerpts on the "All Blog Posts" pages should be.

```js
portalOptions.excerptLength = 250;
```

### Favicon
Add a favicon/tab icon for your Portal.

```js
// If true, inject a favicon
portalOptions.favicon = false;

// The favicon URL
portalOptions.faviconURL = '/files/favicon.ico';

// The favicon sizes
portalOptions.faviconSizes = '16x16 32x32';
```

### Logo
Add a custom logo. Accepts any markup as a string (`<img src>`, `<svg>`, etc.).

```js
portalOptions.logo = null;
```

### Markdown
If true, enable markdown on docs and custom pages.

```js
portalOptions.markdown = true;
```

### Tooltips
If true, activate mashtip tooltips on certain Account page elements.

```js
portalOptions.mashtips = true;
```

### Password Strength
If true, provide a password strength indicator on registration and password change pages.

```js
portalOptions.passwordStrength = true;
```

### Responsive Design
If true, include the viewport resizing meta tag required for responsively designed sites.

```js
portalOptions.responsive = true;
```