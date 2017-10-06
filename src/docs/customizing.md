# Customizing

## File Structure

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code. Compiled documentation is in the `docs` directory.


```
portal-theme
|—— dist/
|   |—— css/
|   |—— img/
|   |—— js/
|   |—— svg/
|   |—— templates/
|—— src/
|   |—— docs/
|   |   |—— _templates
|   |   |   |—— _header.html
|   |   |   |—— _footer.html
|   |   |—— index.md
|   |   |—— setup.md
|   |—— js/
|   |   |—— header
|   |   |   |—— # Your feature detection and header scripts
|   |   |—— main
|   |   |   |—— # Your main scripts and JavaScript plugins
|   |—— sass/
|   |   |—— components/
|   |   |   |—— # Your Sass components (compiled in main.scss)
|   |   |—— _config.scss
|   |   |—— _mixins.scss
|   |   |—— main.scss
|   |—— static/
|   |   |—— img/
|   |   |   |—— # Your images
|   |   |—— templates/
|   |   |   |—— body.js
|   |   |   |—— footer.html
|   |   |   |—— header.js
|   |   |   |—— landing-page-trial.html
|   |   |   |—— landing-page.html
|   |   |   |—— last-minute.css
|   |   |—— # Your other non-compiling files
|   |—— svg/
|   |   |—— # Your SVG icons
|   |—— templates/
|   |   |—— _templates
|   |   |   |—— _header.html
|   |   |   |—— _footer.html
|   |   |—— pattern-library.md
|—— .gitignore
|—— README.md
|—— gulpfile.js
|—— package.json
```

<hr>


## Working with Compiled Files

You can modify the compiled `main.css` stylesheet in the `dist` > `css` directory, and the compiled `header.js` and `main.js` JavaScript files in the `dist` > `js` directory.

### Updating your logo

Out-of-the-box, your Portal will create a text logo using the Portal Name that you set under `Portal Settings` > `General` in the Dashboard. You can replace it with an `<img>`or `<svg>`.

Details on how to do this are found in the [Pattern Library for your Portal](setup.html#pattern-library).

### CSS Settings

<dl>
	<dt>Page Width</dt>
	<dd>The <code>.container</code> class sets the width for page content. Adjust the <code>max-width</code> property to set the maximum width of the page.</dd>

	<dt>Font Stack</dt>
	<dd>The <code>body</code> element sets the typeface for the entire set. By default, the font stack is Helvetica Neue, Arial, and sans-serif. The two exceptions are <code>pre</code> and <code>code</code> elements, which use a monospace stack. Adjust as desired.</dd>

	<dt>Typographic Scale</dt>
	<dd>Sparrow uses a <a href="http://lamb.cc/typograph/">fluid typographic scale</a>. You can scale the size of all site elements proportionately by adjusting the <code>font-size</code> property on the body element, which is set to 100% by default (and 125% on screens above 80em).</dd>

	<dt>Colors (used throughout)</dt>
	<dd>
		You can adjust the color palette by doing a find-and-replace in the <code>main.css</code> file for the following values:<br>
		<ul>
			<li>Primary: <code style="color: #ffffff; background-color: #0088cc;">#0088cc</code></li>
			<li>Black: <code style="color: #ffffff; background-color: #272727;">#272727</code></li>
			<li>White: <code style="color: #272727; background-color: #ffffff;">#ffffff</code></li>
			<li>Dark Gray: <code style="color: #ffffff; background-color: #808080;">#808080</code></li>
			<li>Light Gray: <code style="color: #272727; background-color:#e5e5e5 ;">#e5e5e5</code></li>
		</ul>
	</dd>

	<dt>Breakpoints (used throughout)</dt>
	<dd>Extra Small: 20em<br>
	Small: 30em<br>
	Medium: 40em<br>
	Large: 60em<br>
	Extra Large: 80em</dd>
</dl>

<hr>


## Working with the Source Files

Working with the development code in the `src` directory allows you to take advantage of the powerful features included in Sparrow's [Gulp.js](http://gulpjs.com) build system.


### Dependencies

Make sure these are installed first.

- [Node.js](http://nodejs.org/)
- [Gulp](http://gulpjs.com/)</a> `sudo npm install -g gulp`


### Quick Start

1. Open up `package.json`. Change the `name`, `description`, and `author` values as needed.
	```bash
	"name": "CLIENT-NAME-WITHOUT-SPACES",
	"description": "Portal theme for CLIENT",
	"author": {
	    "name": "YOUR NAME"
	}
	```
2. In terminal, navigate into the directory.
	```bash
	cd ~/path/to/sparrow
	```
3. Use NPM to install the required files.
	```bash
	sudo npm install
	```
4. When it's done installing, run one of the task runners to get going:
	```bash
	gulp # manually compile files
	gulp watch  # automatically compiles files and applies changes using LiveReload
	```


### Working with Sass

Sparrows's Sass files are located in `src` > `sass`. Sparrow's build system generates minified and unminified CSS files. It also includes [autoprefixer](https://github.com/postcss/autoprefixer), which adds vendor prefixes for you if required by the last two versions of a browser (you can configure browser support in `gulpfile.js`).

#### `_config.scss`

The `_config.scss` file contains variables for all of the colors, font stacks, breakpoints, and sizing used in Sparrow. It also contains settings for the grid.

#### `_mixins.scss`

The `_mixins.scss` file contains just a handful of mixins and functions to speed up development.

- `@include font-face()` - Add the `@font-face` property with all required settings and fields.
- `@include strip-unit()` - Remove the units (px, em, etc.) from numbers.
- `@include calc-em()` - Converts pixels into ems.


#### Components

The `components` folder contains all of the theme components: the grid, button and form styling, and so on. The `main.scss` file imports `_config.scss`, `_mixins.scss`, and the components for processing into a CSS file.

Mashery-specific styles (IO-Docs, Login, etc.) can be found in the `_mashery-*.scss` prefixed files.


### Working with SVGs

SVG files placed in the `src` > `svg` directory will be optimized and compiled into the `dist` > `svg` directory.


### Working with Images

Image files placed in the `src` > `img` directory will be copied as-is into the `dist` > `img` directory. While you can add image optimization processes to Gulp, I find that tools like [ImageOptim](https://imageoptim.com/) and [b64.io](http://b64.io/) do a better job.


### Working with JavaScript

Sparrow's JavaScript files are located in the `src` > `js` directory.

Files placed directly in the `js` folder will compile directly to `dist` > `js` as both minified and unminified files. Files placed in subdirectories will also be concatenated into a single file.

For example, `detects` > `flexbox.js` and `detects` > `svg.js` would compile into `detects.js` in the `dist` > `js` directory.


### Working with Static Files

Files and folders placed in the `src` > `static` directory will be copied as-is into the `dist` directory.


### GUI Source Compilers

If you would like the benefits of working with the source files, but aren't comfortable using terminal and command line code, there are a few GUIs that can help.

[CodeKit](https://incident57.com/codekit/) is a powerful Mac-only product, and [Prepos](http://alphapixels.com/prepros/) is a similar product for Windows.</p>

These tools can't replicate all of the features of the Gulp.js build system, but they come close.