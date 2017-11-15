# IO-Docs Tricks

You can style an IO-Docs method different when it's expanded than when it's collapsed.

To make it work, you need to use a [JavaScript Event Hook](/docs/read/customizing_your_portal/mashery_portal_2_documentation/Event_Hooks) to add a class to the expanded or collapsed method, and some CSS to change the style.

**JavaScript**

```js
// Add active class to method
document.addEventListener('portalIODocsShowMethod', function (event) {
	event.target.closest('.method').classList.add('method-active');
}, false);

// Remove active class from method
document.addEventListener('portalIODocsHideMethod', function (event) {
	event.target.closest('.method').classList.remove('method-active');
}, false);
```

**CSS**

```css
.method {
	/* Base styles */
}

.method.method-active {
	/* Modified styles */
}
```