# Working with jQuery

jQuery is *not* bundled with your Portal. If you'd rather use jQuery than [work with native, modern JavaScript](/docs/read/customizing_your_portal/extras/Working_with_Modern_JavaScript), you should load it using the [`m$.loadJS()` helper method](/docs/read/customizing_your_portal/mashery_portal_2_documentation/JavaScript_API#loadjs) and run your jQuery-dependent code as a callback.

Add this in Control Center under `Manage > Portal > Portal Settings` under the `Inline JavaScript > Body JavaScript` section.

```js
window.addEventListener('portalAfterRender', function () {

	// Load jQuery
	m$.loadJS('https://code.jquery.com/jquery-3.2.1.min.js', function () {
		// Your code goes here...
	});

}, false);
```