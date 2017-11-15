# Event Hooks

Mashery Portal 2 emits custom JavaScript events that you can hook into to run other scripts. Use `addEventListener()` on the `window` element to listen for Portal events.

For example, here's how to open an alert window every time a page is rendered.

```js
window.addEventListener('portalAfterRender', function (event) {
	alert('The Portal was rendered!');
}, false);
```

## Events

- `portalLoaded` runs after the Portal app is loaded but before it's been initalized.
- `portalBeforeInit` runs before the Portal is initialized.
- `portalAfterInit` runs after the Portal is initialized.
- `portalBeforeRender` runs before the Portal is rendered.
- `portalAfterRender` runs after the Portal is rendered.
- `portalBeforeRenderAjax` runs before an Ajax page load.
- `portalAfterRenderAjax` runs after an Ajax page load.
- `portalIODocsShowMethod` runs after an IO-Docs method is shown.
- `portalIODocsHideMethod` runs after an IO-Docs method is hidden.
- `portalIODocsShowEndpoint` runs after an IO-Docs endpoint is shown.
- `portalIODocsHideEndpoint` runs after an IO-Docs endpoint is hidden.


## Emitting your own custom events

Mashery Portal 2 also includes [a JavaScript API for emitting your own custom events](/docs/read/customizing_your_portal/mashery_portal_2_documentation/JavaScript_API#emitevent).