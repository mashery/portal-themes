# Sparrow

Sparrow is a flexible, mobile-friendly theme for the Mashery Portal.

It looks great out-of-the-box, and includes features that make customization easy for non-technical users. If you're a developer, it includes a build system powered by Gulp and Sass.

**[View the Live Demo Portal.](https://stagingcs9.mashery.com/)**

<hr>

## Mashery portals built with Sparrow

In case you need a little inspiration...

- [CNN](https://developer.cnn.com)
- [Monotch](https://developer.monotch.com)
- [GTA Travel](https://developer.gta-travel.com)
- [Domain Group](https://developer.domain.com.au)
- [Autodata](https://developer.autodata-group.com)
- [LATAM Airlines](https://developer.latam.com)
- [IEEE](https://developer.ieee.org)
- [Sportradar](https://developer.sportradar.com)

<hr>


## The Sparrow Approach

Sparrow was built to be flexible and modular, with performance and accessibility in mind.

### Mobile-First

Sparrow is built mobile-first. The base structure is a fully-fluid, single-column layout. It uses `@media (min-width: whatever)` to add a grid-based layout to bigger screens.

Think of it as progressive enhancement for the layout.

Sparrow also includes feature detection for things like SVG support. Just like the layout, those are served to browsers that support them, while fallback text is supplied to older and less capable browsers.


### Object Oriented CSS

Sparrow takes an [OOCSS approach](http://www.slideshare.net/stubbornella/object-oriented-css) to web development.

Throughout the stylesheet, you'll see base styles and modifying styles. For example, `.btn` sets the default button styles and behavior, while `.btn-secondary` changes the color and `.btn-large` changes the size. A big button with secondary colors would look like this:

<button class="btn btn-secondary btn-large">A Big Button</button>

```markup
<button class="btn btn-secondary btn-large">A Big Button</button>
```

Classes can be mixed, matched and reused throughout a project.

<hr>


## Browser Compatibility

Sparrow is optimized for modern browsers and IE 9+.

### Vendor Prefixing

Sparrow uses [Autoprefixer](https://github.com/postcss/autoprefixer), and is configured to only add prefixes if required by the last two versions of a browser. If a feature isn't working (for example, the grid does not work in Firefox 28 and lower), it may simply need a vendor prefix.

For more details on when support for specific features were added to different browsers, consult [Can I Use](http://caniuse.com/).