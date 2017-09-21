# Responsive Videos

Add fluid, responsive videos to your Portal.

<div id="plugin-note"></div>

<div id="demo-toc"></div>

## The Problem

HTML5 video can be made responsive with two lines of CSS:

```css
video {
    max-width: 100%;
    height: auto;
}
```

Unfortunately, this approach does not work with iframe videos like those from YouTube and Vimeo. [Dave Rupert demonstrates the problem](https://vimeo.com/28523422) in this video:

<iframe src="https://player.vimeo.com/video/28523422" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

## Getting Started

Initialize FluidVids.js in a `portalAfterRender` event. You need to pass in the element selectors and players to support as options. The default initialization generated by the [Theme Customizer](/docs/read/customizing/download) includes iframes and objects for YouTube and Vimeo.

```js
window.addEventListener('portalAfterRender', function (event) {
	fluidvids.init({
		selector: ['iframe', 'object'], // runs querySelectorAll()
		players: ['www.youtube.com', 'player.vimeo.com'] // players to support
	});
}, false);
```

And that's it, you're done. Nice work!