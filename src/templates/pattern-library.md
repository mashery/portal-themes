# Pattern Library

The Pattern Library is living documentation for your Portal theme. If you would like to update your theme, [click here to download the source files](/files/portal-theme.zip).

## Brand Elements

<style type="text/css">
	.demo-color-box {
		border: 1px solid #808080;
		height: 8em;
		margin-right: 1em;
		margin-bottom: 1em;
		padding: 1em;
		width: 8em;
	}

	.demo-font {
		margin-bottom: 0.5em;
	}
</style>

### Colors

<div class="clearfix">
	<div class="float-left demo-color-box" style="background-color: #0088cc; color: white;">
		#0088cc
	</div>
	<div class="float-left demo-color-box" style="background-color: #ffdd2f;">
		#ffdd2f
	</div>
	<div class="float-left demo-color-box" style="background-color: #b4d253;">
		#b4d253
	</div>
	<div class="float-left demo-color-box" style="background-color: #808080; color: white;">
		#808080
	</div>
	<div class="float-left demo-color-box" style="background-color: #e5e5e5;">
		#e5e5e5
	</div>
	<div class="float-left demo-color-box" style="background-color: #ffffff;">
		#ffffff
	</div>
	<div class="float-left demo-color-box" style="background-color: #272727; color: white;">
		#272727
	</div>
</div>

### Font Stacks

<p class="demo-font" style="font-family: 'Helvetica Neue', Arial, sans-serif">Helvetica Neue, Arial, sans-serif</p>
<p class="demo-font" style="font-family: Georgia, Times, serif;">Georgia, Times, serif</p>
<p class="demo-font" style="font-family: Menlo, Monaco, 'Courier New', monospace;">Menlo, Monaco, Courier New, monospace</p>

<hr>


## `portalReady()` JavaScript Method

Use the `portalReady()` method to run scripts after the Portal is ready and loaded, without needing to use jQuery.

```javascript
portalReady(function () {
	// Your script(s) here...
});
```

<hr>


## Updating the Logo

Out-of-the-box, your Portal will create a text logo using the `Portal Name` that you set under `Portal Settings` > `General` in the Dashboard. You can replace it with an `<img>` or `<svg>` using the `loadCustomLogo()` JavaScript method. It's recommended that you add this to the `Head JavaScript` section in `Portal Settings` > `Portal Setup`.

```javascript
// Example
portalReady(function () {
	loadCustomLogo( '<img alt="Acme Corp" src="/files/acme-corp-logo.png">' );
});
```

If your logo is tall, it may cause the navigation menu (and small viewport toggle link) to become misaligned with the logo. You can fix this by simply adding a `padding-top` value to the `#nav-menu` and `#nav-menu-toggle` elements. It's recommended that you add this to the `Inline CSS` section in `Portal Settings` > `Portal Setup`.

```css
/* Example */
#nav-menu,
#nav-menu-toggle {
	padding-top: 1em;
}
```

<hr>

## The Grid

<style type="text/css">
	/* Add a background to the grids so you can see them in action */
	.demo-grid-bg {
		background-color: #f7f7f7;
		border: 1px solid #e5e5e5;
		border-radius: 0.0725em;
		margin-bottom: 1.5625em;
		padding: 0.9375em;
	}
</style>

Your theme uses a fluid, mobile-first grid system based on simple fractions—halves, thirds, and fourths. It supports nesting, and includes special classes for offsets and content choreography.

### Base Grid

The `.container` class centers content on the page and restricts it to a maximum width. To create a grid, add a `<div>` with a `.row` class. You can create grids within a row by creating `<div>` elements with the `.grid-$size` class.

<div class="row">
	<div class="grid-third"><div class="demo-grid-bg">.grid-third</div></div>
	<div class="grid-two-thirds"><div class="demo-grid-bg">.grid-two-thirds</div></div>
</div>

<div class="row">
	<div class="grid-fourth"><div class="demo-grid-bg">.grid-fourth</div></div>
	<div class="grid-three-fourths"><div class="demo-grid-bg">.grid-three-fourths</div></div>
</div>

<div class="row">
	<div class="grid-half"><div class="demo-grid-bg">.grid-half</div></div>
	<div class="grid-half"><div class="demo-grid-bg">.grid-half</div></div>
</div>

<div class="row">
	<div class="grid-full"><div class="demo-grid-bg">.grid-full</div></div>
</div>

```markup
<div class="container">

	<p>Your theme uses a fluid, mobile-first grid system...</p>

	<div class="row">
		<div class="grid-third">.grid-third</div>
		<div class="grid-two-thirds">.grid-two-thirds</div>
	</div>

	<div class="row">
		<div class="grid-fourth">.grid-fourth</div>
		<div class="grid-three-fourths">.grid-three-fourths</div>
	</div>

	<div class="row">
		<div class="grid-half">.grid-half</div>
		<div class="grid-half">.grid-half</div>
	</div>

	<div class="row">
		<div class="grid-full">.grid-full</div>
	</div>

</div>
```

### Offsets

Push grids to the right by adding an `.offset-$size` class. Center grids with the `.float-center` class.

<div class="row">
	<div class="grid-three-fourths offset-fourth"><div class="demo-grid-bg">.grid-three-fourths .offset-fourth</div></div>
</div>

<div class="row">
	<div class="grid-third"><div class="demo-grid-bg">.grid-third</div></div>
	<div class="grid-third offset-third"><div class="demo-grid-bg">.grid-third .offset-third</div></div>
</div>

<div class="row">
	<div class="grid-two-thirds float-center"><div class="demo-grid-bg">.grid-two-thirds .float-center</div></div>
</div>

```markup
<div class="row">
	<div class="grid-three-fourths offset-fourth">.grid-three-fourths .offset-fourth</div>
</div>

<div class="row">
	<div class="grid-third">.grid-third</div>
	<div class="grid-third offset-third">.grid-third .offset-third</div>
</div>

<div class="row">
	<div class="grid-two-thirds float-center">.grid-two-thirds .float-center</div>
</div>
```

### Grids on Small Viewports

The grid activates on medium-sized viewports by default. You can toggle the grid on smaller screens by adding a simple class&mdash;`.row-start-xsmall` or `.row-start-small`&mdash;to the desired `.row` element.

**Extra Small Screens**
<div class="row row-start-xsmall">
	<div class="grid-fourth"><div class="demo-grid-bg">.grid-fourth</div></div>
	<div class="grid-fourth"><div class="demo-grid-bg">.grid-fourth</div></div>
	<div class="grid-fourth"><div class="demo-grid-bg">.grid-fourth</div></div>
	<div class="grid-fourth"><div class="demo-grid-bg">.grid-fourth</div></div>
</div>

**Small Screens**
<div class="row row-start-small">
	<div class="grid-fourth"><div class="demo-grid-bg">.grid-fourth</div></div>
	<div class="grid-fourth"><div class="demo-grid-bg">.grid-fourth</div></div>
	<div class="grid-fourth"><div class="demo-grid-bg">.grid-fourth</div></div>
	<div class="grid-fourth"><div class="demo-grid-bg">.grid-fourth</div></div>
</div>

```markup
Extra Small Screens
<div class="row row-start-xsmall">
	<div class="grid-fourth">.grid-fourth</div>
	<div class="grid-fourth">.grid-fourth</div>
	<div class="grid-fourth">.grid-fourth</div>
	<div class="grid-fourth">.grid-fourth</div>
</div>

Small Screens
<div class="row row-start-small">
	<div class="grid-fourth">.grid-fourth</div>
	<div class="grid-fourth">.grid-fourth</div>
	<div class="grid-fourth">.grid-fourth</div>
	<div class="grid-fourth">.grid-fourth</div>
</div>
```

### Content Choreography

Flip the display order of a grid on bigger viewports by adding the `.grid-flip` class.

<div class="row">
	<div class="grid-third grid-flip"><div class="demo-grid-bg">First in HTML</div></div>
	<div class="grid-two-thirds"><div class="demo-grid-bg">Second in HTML</div></div>
</div>

```markup
<div class="row">
	<div class="grid-third grid-flip">First in HTML</div>
	<div class="grid-two-thirds">Second in HTML</div>
</div>
```

### Dynamic Grids

Create grids that vary in size based on screen width using the `.grid-dynamic` class.

<div class="row">
	<div class="grid-dynamic"><p><img src="https://source.unsplash.com/random/350x350"></p></div>
	<div class="grid-dynamic"><p><img src="https://source.unsplash.com/random/350x350"></p></div>
	<div class="grid-dynamic"><p><img src="https://source.unsplash.com/random/350x350"></p></div>
	<div class="grid-dynamic"><p><img src="https://source.unsplash.com/random/350x350"></p></div>
	<div class="grid-dynamic"><p><img src="https://source.unsplash.com/random/350x350"></p></div>
	<div class="grid-dynamic"><p><img src="https://source.unsplash.com/random/350x350"></p></div>
	<div class="grid-dynamic"><p><img src="https://source.unsplash.com/random/350x350"></p></div>
	<div class="grid-dynamic"><p><img src="https://source.unsplash.com/random/350x350"></p></div>
	<div class="grid-dynamic"><p><img src="https://source.unsplash.com/random/350x350"></p></div>
	<div class="grid-dynamic"><p><img src="https://source.unsplash.com/random/350x350"></p></div>
	<div class="grid-dynamic"><p><img src="https://source.unsplash.com/random/350x350"></p></div>
	<div class="grid-dynamic"><p><img src="https://source.unsplash.com/random/350x350"></p></div>
</div>

```markup
<div class="row">
	<div class="grid-dynamic"><img src="kitten.jpg"></div>
	<div class="grid-dynamic"><img src="kitten.jpg"></div>
	<div class="grid-dynamic"><img src="kitten.jpg"></div>
	<div class="grid-dynamic"><img src="kitten.jpg"></div>
	<div class="grid-dynamic"><img src="kitten.jpg"></div>
	<div class="grid-dynamic"><img src="kitten.jpg"></div>
	<div class="grid-dynamic"><img src="kitten.jpg"></div>
	<div class="grid-dynamic"><img src="kitten.jpg"></div>
	<div class="grid-dynamic"><img src="kitten.jpg"></div>
	<div class="grid-dynamic"><img src="kitten.jpg"></div>
	<div class="grid-dynamic"><img src="kitten.jpg"></div>
	<div class="grid-dynamic"><img src="kitten.jpg"></div>
</div>
```

### Full Width Pages

By default, the main body content on a page is wrapped in a `.container` class element, which provides left and right padding and centers it in the viewport. It also is given a `.grid-two-thirds` class to keep line-length on content more readable.

To unlock full manual control over the layout, with content bleeding to both edges, call the `fullWidth()` JavaScript method at the top of the page.

```markup
<script>
portalReady(function () {
	fullWidth();
});
</script>
```

To hide the `h1.first` element, the first header on the page, also pass in a `true` argument.

```markup
<script>
portalReady(function () {
	fullWidth( true );
});
</script>
```

If you want your page to be wide but still have some margins with the `.container`, you can pass in a second argument of `true`.


```markup
<script>
portalReady(function () {
	// Keep the H1 element, but make the content wide
	fullWidth( false, true );
});
</script>
```

<hr>


## Typography

Your theme uses relative sizing (ems and % instead of pixels) for everything.

*New to relative sizing? [Learn more.](http://gomakethings.com/working-with-relative-sizing/)*


### Text Basics

Default text<br>
<span class="text-muted">Muted text</span><br>
<span class="text-small">Small text</span><br>
<span class="text-large">Large text</span><br>
<span class="text-hero">Hero text</span><br>
<a href="#">Hyperlinks</a><br>
<a class="link-plain" href="#">Plain Hyperlinks</a><br>
<strong>Bold</strong> and <em>italics</em>

```markup
Default text
<span class="text-muted">Muted text</span>
<span class="text-small">Small text</span>
<span class="text-large">Large text</span>
<span class="text-hero">Hero text</span>
<a href="#">Hyperlinks</a>
<a class="link-plain" href="#">Another Plain Hyperlink</a> (alternate: <span class="link-plain"><a href="#">Another Plain Hyperlink</a></span>)
<strong>Bold</strong> and <em>italics</em>
```

**Note:** Because Your theme uses relative sizing, you should always apply `.text-large` and `.text-small` classes to a `<span>` element and not directly to a `<p>`. Otherwise, your spacing will get all messed up. The `.text-*` classes can be found in `_overrides.scss` for better cascade inheritance.


### Block-Level Links

Use the `.link-block` class to create block-level links that are styled like regular text. Add the `.link-block-styled` class to the sections of text you want styled like a traditional link.

<a class="link-block" href="#">
	<h4 class="no-margin-bottom">This is a block-level link</h4>
	<p>
		This whole section is a clickable link. Hover over it to see.<br>
		<span class="link-block-styled">Only this text is styled like a link &rarr;</span>
	</p>
</a>

```markup
<a class="link-block" href="#">
	<h4>A block-level link</h4>
	<p>This whole section is a clickable link. Hover over it to see.</p>
	<p><span class="link-block-styled">Only this text is styled like a link &rarr;</span></p>
</a>
```

<hr>


## Lists

Your theme includes styling for ordered, unordered, unstyled, inline, breadcrumb, and definition lists.

<div class="row">
	<div class="grid-third">
		<strong>Ordered</strong>
		<ol>
			<li>Item 1</li>
			<li>Item 2</li>
			<li>Item 3</li>
		</ol>
	</div>
	<div class="grid-third">
		<strong>Unordered</strong>
		<ul>
			<li>Item 1</li>
			<li>Item 2</li>
			<li>Item 3</li>
		</ul>
	</div>
	<div class="grid-third">
		<strong>Unstyled</strong>
		<ul class="list-unstyled">
			<li>Item 1</li>
			<li>Item 2</li>
			<li>Item 3</li>
		</ul>
	</div>
</div>

<div>
	<strong>Inline</strong>
	<ul class="list-inline">
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3</li>
	</ul>
</div>

<div>
	<strong>Inline Responsive</strong>
	<ul class="list-inline list-inline-responsive">
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3</li>
	</ul>
</div>

<div>
	<strong>Inline Divided</strong>
	<ul class="list-inline list-inline-divided">
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3</li>
	</ul>
</div>

<div>
	<strong>Inline Breadcrumbs</strong>
	<ul class="list-inline list-inline-breadcrumbs">
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3</li>
	</ul>
</div>

<dl>
	<dt>Definition List</dt>
	<dd>Encloses a list of pairs of terms and descriptions. Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).</dd>

	<dt>Here's another term</dt>
	<dd>And another definition.</dd>
</dl>

```markup
Ordered
<ol>
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ol>

Unordered
<ul>
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ul>

Unstyled
<ul class="list-unstyled">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ul>

Inline
<ul class="list-inline">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ul>

Inline Responsive
<ul class="list-inline list-inline-responsive">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ul>

Inline Divided
<ul class="list-inline list-inline-divided">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ul>

Inline Breadcrumbs
<ul class="list-inline list-inline-breadcrumbs">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ul>

<dl>
	<dt>Definition List</dt>
	<dd>Encloses a list of pairs of terms and descriptions. Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).</dd>

	<dt>Here's another term</dt>
	<dd>And another definition.</dd>
</dl>
```

*For semantic reasons, `.list-unstyled` and `.list-inline` should only be applied to unordered lists.*

<hr>


## Headings

Your theme includes styling for `h1` through `h6` headings.

<h1>h1. Heading 1</h1>

<h2>h2. Heading 2</h2>

<h3>h3. Heading 3</h3>

<h4>h4. Heading 4</h4>

<h5>h5. Heading 5</h5>

<h6>h6. Heading 6</h6>


```markup
<h1>h1. Heading 1</h1>
<h2>h2. Heading 2</h2>
<h3>h3. Heading 3</h3>
<h4>h4. Heading 4</h4>
<h5>h5. Heading 5</h5>
<h6>h6. Heading 6</h6>
```

### Semantic Heading Classes

All heading values can also be applied as classes. For example, if a heading should be an `h1` element semantically, but you would like it to be styled as an `h4` element, you can apply `class="h4"` to the `h1` element.

<h1 class="h4 text-left">This is an h1 heading that's styled as an h4 heading</h1>

```markup
<h1 class="h4 text-left">This is an h1 heading that's styled as an h4 heading</h1>
```

<hr>


## Quotes and Citations

<blockquote>
	Someone once said something so important, it was deemed worthy of repeating here in the form of a blockquote. This is that blockquote.
	<cite>- Someone</cite>
</blockquote>

You can also include superscripts<sup>1</sup> and subscripts<sub>xyz</sub>.

```markup
<blockquote>
	Someone once said something so important, it was deemed worthy of repeating here in the form of a blockquote. This is that blockquote.
	<cite>- Someone</cite>
</blockquote>

You can also include superscripts<sup>1</sup> and subscripts<sub>xyz</sub>.
```

<hr>


## Code

Inline code: `.js-example`.

```css
/* Preformatted Text */
.js-example {
	color: #272727;
	background: #ffffff;
}
```

```markup
<p>Inline code: <code>.js-example</code></p>

<pre>
	<code class="lang-css">
		/* Preformatted Text */
		.js-example {
			color: #272727;
			background: #ffffff;
		}
	</code>
</pre>
```

You'll need to escape brackets contained in code by typing `&lt;` for `<` and `&gt;` for `>`.

<hr>


## Lines

Add lines to your markup using the `<hr>` element.

<hr>


## Backgrounds

Add background colors with a handful of helper classes.

<div class="bg-muted"><div class="container padding-left padding-right">.bg-muted</div></div>
<div class="bg-primary"><div class="container padding-left padding-right">.bg-primary</div></div>
<div class="bg-secondary"><div class="container padding-left padding-right">.bg-secondary</div></div>
<div class="bg-tertiary margin-bottom"><div class="container padding-left padding-right">.bg-tertiary</div></div>

```markup
<div class="bg-muted">.bg-muted</div>
<div class="bg-primary">.bg-primary</div>
<div class="bg-secondary">.bg-secondary</div>
<div class="bg-tertiary">.bg-tertiary</div>
```

### Hero Image Backgrounds

Use the `.bg-hero` class with one of the above background colors to create a background hero image. This class ensures that the image fully covers the background.

You will need to specify a background image (using either the inline CSS feature in the Dashboard or by adding inline CSS to the element directly). You may also wish to add a minimum height (or heights at different breakpoints) depending on the image.

<div class="bg-primary bg-hero margin-bottom" style="background-image: url('https://source.unsplash.com/random/740x320'); min-height: 15em;">
	<div class="padding-top-large padding-bottom-large text-center">
		<span class="text-large">This is a hero image with text.</span>
	</div>
</div>

```markup
<div class="bg-primary bg-hero" style="background-image: url('https://source.unsplash.com/random/740x320'); min-height: 15em;">
	<div class="padding-top-large padding-bottom-large text-center">
		<span class="text-large">This is a hero image with text.</span>
	</div>
</div>
```

<hr>


## Buttons

Button styles can be applied `<a>`, `<button>`, and `<input type="submit">` elements using the `.btn` class. Use `.active` and `.disabled` classes to change the appearance of buttons.

<button class="btn">Button</button>
<button class="btn btn-secondary">Button Secondary</button>
<button class="btn btn-tertiary">Button Tertiary</button>
<button class="btn btn-large">Button Large</button>

<button class="btn btn-block">Button Block</button>
<button class="btn btn-secondary btn-block">Button Block</button>
<button class="btn btn-tertiary btn-block">Button Block</button>

<button class="btn active">Active</button>
<button class="btn btn-secondary active">Secondary Active</button>
<button class="btn btn-tertiary active">Tertiary Active</button>
<button class="btn disabled">Disabled</button>
<button class="btn btn-secondary disabled">Secondary Disabled</button>
<button class="btn btn-tertiary disabled">Tertiary Disabled</button>

```markup
<button class="btn">Button</button>
<button class="btn btn-secondary">Button Secondary</button>
<button class="btn btn-tertiary">Button Tertiary</button>
<button class="btn btn-large">Button Large</button>

<button class="btn btn-block">Button Block</button>
<button class="btn btn-secondary btn-block">Button Block</button>
<button class="btn btn-tertiary btn-block">Button Block</button>

<button class="btn active">Active</button>
<button class="btn btn-secondary active">Secondary Active</button>
<button class="btn btn-tertiary active">Tertiary Active</button>
<button class="btn disabled">Disabled</button>
<button class="btn btn-secondary disabled">Secondary Disabled</button>
<button class="btn btn-tertiary disabled">Tertiary Disabled</button>
```

<hr>


## Forms

Labels, legends and inputs are styled as full width block elements (with the exception of checkboxes and radio buttons).

<form>
	<label>Label</label>
	<input type="text">
	<label>
		<input type="checkbox">
		Option 1
	</label>
	<label>
		<input type="checkbox">
		Option 2
	</label>
	<label>
		<input type="radio" name="radioset">
		Option 1
	</label>
	<label>
		<input type="radio" name="radioset">
		Option 2
	</label>
	<select>
		<option>Select 1</option>
		<option>Select 2</option>
		<option>Select 3</option>
	</select>
	<textarea></textarea>
</form>

```markup
<form>
	<label>Label</label>
	<input type="text">
	<label>
		<input type="checkbox">
		Option 1
	</label>
	<label>
		<input type="checkbox">
		Option 2
	</label>
	<label>
		<input type="radio" name="radioset">
		Option 1
	</label>
	<label>
		<input type="radio" name="radioset">
		Option 2
	</label>
	<select>
		<option>Select 1</option>
		<option>Select 2</option>
		<option>Select 3</option>
	</select>
	<textarea></textarea>
</form>
```

***Tip:*** *Wrap checkboxes and radio buttons inside a `<label>` to make them easier to click.*


### Form Layouts

Use the grid system to add structure to your forms.

<form>
	<div class="row">
		<div class="grid-fourth">
				<label>Name</label>
		</div>
		<div class="grid-three-fourths">
				<input type="text">
		</div>
	</div>
	<div class="row">
		<div class="grid-fourth">
				<label>Message</label>
		</div>
		<div class="grid-three-fourths">
				<textarea></textarea>
		</div>
	</div>
	<div class="row">
		<div class="grid-three-fourths offset-fourth">
			<button class="btn btn-blue">Submit</button>
		</div>
	</div>
</form>

```markup
<form>
	<div class="row">
		<div class="grid-fourth">
				<label>Name</label>
		</div>
		<div class="grid-three-fourths">
				<input type="text">
		</div>
	</div>
	<div class="row">
		<div class="grid-fourth">
				<label>Message</label>
		</div>
		<div class="grid-three-fourths">
				<textarea></textarea>
		</div>
	</div>
	<div class="row">
		<div class="grid-three-fourths offset-fourth">
			<button class="btn btn-blue">Submit</button>
		</div>
	</div>
</form>
```


### Condensed &amp; Inline Inputs

For smaller forms, add the `.input-condensed` class to your input fields. For inline form elements, add the `.input-inline` class.

<form>
	<input type="text" class="input-inline" placeholder=".input-inline">
	<input type="text" class="input-condensed input-inline" placeholder=".input-condensed">
</form>

```markup
<form>
	<input type="text" class="input-inline">
	<input type="text" class="input-condensed input-inline">
</form>
```

<hr>


## Tables

Simple, easy-to-read tables.

<table>
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Super Hero</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Peter</td>
			<td>Parker</td>
			<td>Spiderman</td>
		</tr>
		<tr>
			<td>Bruce</td>
			<td>Wayne</td>
			<td>Batman</td>
		</tr>
		<tr>
			<td>Clark</td>
			<td>Kent</td>
			<td>Superman</td>
		</tr>
	</tbody>
</table>

```markup
<table>
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Super Hero</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Peter</td>
			<td>Parker</td>
			<td>Spiderman</td>
		</tr>
		<tr>
			<td>Bruce</td>
			<td>Wayne</td>
			<td>Batman</td>
		</tr>
		<tr>
			<td>Clark</td>
			<td>Kent</td>
			<td>Superman</td>
		</tr>
	</tbody>
</table>
```

### Condensed Table

Add the `.table-condensed` class for more compact tables.

<table class="table-condensed">
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Super Hero</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Peter</td>
			<td>Parker</td>
			<td>Spiderman</td>
		</tr>
		<tr>
			<td>Bruce</td>
			<td>Wayne</td>
			<td>Batman</td>
		</tr>
		<tr>
			<td>Clark</td>
			<td>Kent</td>
			<td>Superman</td>
		</tr>
	</tbody>
</table>

```markup
<table class="table-condensed">
	...
</table>
```

### Zebra Striping

Add zebra striping for easier readability with the `.table-striped` class.

<table class="table-striped">
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Super Hero</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Peter</td>
			<td>Parker</td>
			<td>Spiderman</td>
		</tr>
		<tr>
			<td>Bruce</td>
			<td>Wayne</td>
			<td>Batman</td>
		</tr>
		<tr>
			<td>Clark</td>
			<td>Kent</td>
			<td>Superman</td>
		</tr>
	</tbody>
</table>

```markup
<table class="table-striped">
	...
</table>
```

### Responsive Table

Add the `.table-responsive` class for tables that reformat on smaller viewports. (You can automatically make all tables responsive&mdash;including adding the `data-label` attributes&mdash;using [responsive-tables.js](#automatic-responsive-tables).)

<table class="table-responsive">
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Super Hero</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-label="First Name">Peter</td>
			<td data-label="Last Name">Parker</td>
			<td data-label="Super Hero">Spiderman</td>
		</tr>
		<tr>
			<td data-label="First Name">Bruce</td>
			<td data-label="Last Name">Wayne</td>
			<td data-label="Super Hero">Batman</td>
		</tr>
		<tr>
			<td data-label="First Name">Clark</td>
			<td data-label="Last Name">Kent</td>
			<td data-label="Super Hero">Superman</td>
		</tr>
	</tbody>
</table>

```markup
<table class="table-responsive">
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Super Hero</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td data-label="First Name">Peter</td>
            <td data-label="Last Name">Parker</td>
            <td data-label="Super Hero">Spiderman</td>
        </tr>
        ...
    </tbody>
</table>
```

### Combining Classes

Classes can be combined as needed.

<table class="table-condensed table-striped table-responsive">
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Super Hero</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Peter</td>
			<td>Parker</td>
			<td>Spiderman</td>
		</tr>
		<tr>
			<td>Bruce</td>
			<td>Wayne</td>
			<td>Batman</td>
		</tr>
		<tr>
			<td>Clark</td>
			<td>Kent</td>
			<td>Superman</td>
		</tr>
	</tbody>
</table>

```markup
<table class="table-condensed table-striped table-responsive">
    ...
</table>
```

### WYSIWYG Generated Tables

The Mashery Portal WYSIWYG generates tables that are missing the required `<thead>` and `<th>` elements. You can fix this by calling the `addTableHeaders()` JavaScript method. This is done for you already in the *Body JavaScript* section of *Portal Setup* in the Dashboard.

```js
portalReady(function () {
	addTableHeaders();
});
```

<hr>


## Only show content to logged-in users

The Mashery Portal provides high levels of custom access for pages and documentation based on whether or not a user is logged in, is a member of a particular role or group, and so on. However, these access levels apply to the entire page.

You can selectively hide or show pieces content within a page or documentation only for logged-in users using the `.hide-logged-in` and `.hide-logged-out` classes.

```markup
<div class="hide-logged-in">
	Logged out users will see this. Logged in users will NOT.
</div>

<div class="hide-logged-out">
	Logged out users will NOT see this. Logged in users will.
</div>
```

<hr>


## Alignment, Spacing & Visibility

You can adjust text alignment, spacing, and visibility using a few simple CSS classes.

### Text Alignment

| Class                | Alignment                        |
|----------------------|----------------------------------|
| `.text-left`         | Left                             |
| `.text-center`       | Centered                         |
| `.text-right`        | Right                            |
| `.text-right-large`  | Right *(only on bigger screens)* |


### Floats

| Class           | Float    |
|-----------------|----------|
| `.float-left`   | Left     |
| `.float-center` | Centered |
| `.float-right`  | Right    |
| `.float-middle` | Middle   |
| `.float-bottom` | Bottom   |

The `.float-middle` and `.float-bottom` classes should be applied to block level elements, and require a parent `<div>` with a `.float-*-wrap` class.

```markup
<div class="float-middle-wrap">
	<div class="float-middle">
		.float-middle
	</div>
</div>

<div class="float-bottom-wrap">
	<div class="float-bottom">
		.float-bottom
	</div>
</div>
```

Clear floats by wrapping floated content in a `<div>` with the `.clearfix` class.

```markup
<div class="clearfix">
	<button class="float-right">Floated to the Right</button>
	<button>Not floated</button>
</div>
```

### Margins

| Class                  | Margin             |
|------------------------|--------------------|
| `.no-margin`           | all: `0`           |
| `.no-margin-top`       | top: `0`           |
| `.no-margin-bottom`    | bottom: `0`        |
| `.margin-top`          | top: `1.5625em`    |
| `.margin-bottom`       | bottom: `1.5625em` |
| `.margin-bottom-small` | bottom: `0.5em`    |
| `.margin-bottom-large` | bottom: `2em`      |
| `.margin-left`         | left:   `1.5625em` |
| `.margin-left-small`   | left:   `0.5em`    |
| `.margin-right`        | right:  `1.5625em` |
| `.margin-right-small`  | right:  `0.5em`    |


### Padding

| Class                   | padding            |
|-------------------------|--------------------|
| `.no-padding`           | all: `0`           |
| `.no-padding-top`       | top: `0`           |
| `.no-padding-bottom`    | bottom: `0`        |
| `.padding-top`          | top: `1.5625em`    |
| `.padding-top-small`    | top: `0.5em`       |
| `.padding-top-large`    | top: `2em`         |
| `.padding-bottom`       | bottom: `1.5625em` |
| `.padding-bottom-small` | bottom: `0.5em`    |
| `.padding-bottom-large` | bottom: `2em`      |
| `.padding-left`         | left: `1.5625em`   |
| `.padding-right`        | right: `1.5625em`  |


### Visibility

Hide content using the `[hidden]` attribute.

```markup
<div hidden>This is removed from the markup.</div>
```

If you have text that you don't want displayed on screen, but that should still be in the markup for screen readers (for example, a search form label), simply apply the `.screen-reader` class.</p>

```markup
<form>
	<label class="screen-reader">Search this site</label>
	<input type="text" placeholder="Search this site...">
	<input type="submit">
</form>
```

For visually hidden content that should become visible on focus (such as a [skip nav link](http://webaim.org/techniques/skipnav/) for sighted users navigating by keyboard), also add the `.screen-reader-focusable` class.

```markup
<a class="screen-reader screen-reader-focusable" href="#main">Skip to content</a>
```

<hr>


## SVG Icons

Your theme includes support for SVG icons. We recommend using inline SVGs to maximize browser compatibility.

Open the SVG file in your text editor of choice, and then literally copy-and-paste the content from the file into your markup. Add the `.icon` class&mdash;which sets the height, width, and color to inherit based on its context&mdash;and any others to the `svg` tag.

```markup
<svg class="icon" ...>...</svg>
```

Your theme comes with SVG support detection that adds an `.svg` class to the `<html>` element if supported. If an image is more than decorative, always include supporting text in a `<span>` with the `.icon-fallback-text` class. This text will display when SVG is not supported by the browser, and is accessible to screen readers.

```markup
<svg class="icon" id="tweet-this" ...>...</svg>
<span class="icon-fallback-text">Tweet This</span>
```

<hr>


## Image Styling

Add simple `.img-*` classes to any img element to add styling. You can combine classes for additional styling options. Mix-and-match as desired.

<div class="row">
	<div class="grid-third">
		<p style="text-align: center;">
			<strong>Circle</strong><br>
			<img class="img-circle" src="https://source.unsplash.com/random/200x200">
		</p>
	</div>
	<div class="grid-third">
		<p style="text-align: center;">
			<strong>Border</strong><br>
			<img class="img-border" src="https://source.unsplash.com/random/200x200">
		</p>
	</div>
	<div class="grid-third">
		<p style="text-align: center;">
			<strong>Photo</strong><br>
			<img class="img-photo" src="https://source.unsplash.com/random/200x200">
		</p>
	</div>
</div>

```markup
<img class="img-circle" src="#">
<img class="img-border" src="#">
<img class="img-photo" src="#">
```

<hr>


## Responsive Videos

Your theme comes bundled with [fluidvids.js](https://github.com/toddmotto/fluidvids), a lightweight script that makes iframe videos responsive.

<p><iframe width="560" height="315" src="//www.youtube.com/embed/aQ_isEq-pT8?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe></p>

The script will not run until initialized. This is done for you already in the *Body JavaScript* section of *Portal Setup* in the Dashboard.

```javascript
portalReady(function () {
	fluidvids.init({
		selector: ['iframe', 'object'], // runs querySelectorAll()
		players: ['www.youtube.com', 'player.vimeo.com'] // players to support
	});
});
```

<hr>


## Syntax Highlighting

Syntax highlighting is provided by [Prism by Lea Verou](http://prismjs.com/). It includes support for:

* Bash
* CSS
* C-like languages
* HTTP
* Markup/HTML
* Java
* JavaScript
* PHP
* Python
* Ruby
* Sass/scss

Add `class="lang-*"` to your `<code>` element, where `*` is the language to be highlighted.

```markup
<pre><code class="lang-*">
	/* Your code here...  */
</code></pre>

<!-- Example -->
<pre><code class="lang-php">
	// Your code here...
</code></pre>
```

***Note:*** *The syntax highlighter tool in TinyMCE will automatically add the correct markup and classes and highlighting for you.*

### Language Table

| Language    | Class              |
|-------------|--------------------|
| Bash        | `.lang-bash`       |
| CSS         | `.lang-css`        |
| C, C#, C++  | `.lang-clike`      |
| HTTP        | `.lang-http`       |
| Markup/HTML | `.lang-markup`     |
| Java        | `.lang-java`       |
| JavaScript  | `.lang-javascript` |
| PHP         | `.lang-php`        |
| Python      | `.lang-python`     |
| Ruby        | `.lang-ruby`       |
| Sass        | `.lang-sass`       |
| scss        | `.lang-scss`       |

<hr>


## Click-to-Highlight

Make it easier for developers to copy-and-paste your code by enabling click-to-highlight.

### Getting Started

#### JavaScript

The script will not run until initialized. This can be done in the *Body JavaScript* section of *Portal Setup* in the Dashboard, or as part of an external JS file.

```javascript
portalReady(function () {
    clickToHighlight.init();
});
```

### Global Settings

You can pass options and callbacks into Click-to-Highlight through the `init()` function:

```javascript
clickToHighlight.init({
    initClass: 'js-click-highlight', // Class that's added to the HTML element on init
    callback: function ( container ) {} // Function that runs after content is highlighted
});
```


### Use Click-to-Highlight events in your own scripts

You can also call the highlight function in your own scripts.

#### highlight()

Highlight the contents of an element

```javascript
clickToHighlight.highlight(
	elem // The element to highlight
)

// Example
var container = document.querySelector('#container');
clickToHighlight.highlight( container );
```

#### destroy()

Destroy the current `clickToHighlight.init()`. This is called automatically during the `init` function to remove any existing initializations.

```javascript
clickToHighlight.destroy();
```

<hr>


## Dynamic Links

You can create links whose `href` changes after a user logs in. For example, you may wish to invite a logged out user to register, and a logged in user to view the docs.

Add the `.js-get-startCall the `getStartedLink()` JavaScript method with a selector and the URL to use for the link when the user is logged in.

```markup
<script>
	portalReady(function() {
		dynamicLinks( '#get-started-link', '/docs' );
	});
</script>
<a id="get-started-link" href="/member/register">Get Started</a>
```

<hr>


## Sticky Footer

Force your footer to stick to the bottom of the viewport, even when there's not a lot of content on a page.

### Getting Started

#### Markup

Add the `.js-sticky-footer` class to your footer.

```markup
<footer class="js-sticky-footer">
	...
</footer>
```

#### JavaScript

The script will not run until initialized. This is done for you already in the *Body JavaScript* section of *Portal Setup* in the Dashboard.

```javascript
portalReady(function () {
	stickyFooter.init({
		selector: 'js-sticky-footer',
	});
});
```

### Global Settings

You can pass options and callbacks into the script through the `init()` function:

```javascript
stickyFooter.init({
	selector: '[data-sticky-footer]', // The selector for the footer
	content: '#content', // The selector for the element that contains your main content
	callback: function () {} // Function that runs after adjusting footer
});
```

### Use script events in your own scripts

You can also call Sticky Footer events in your own scripts.

#### setContentHeight
Set page content min-height to push footer to the bottom of the page.

```javascript
stickyFooter.setContentHeight(
	content, // The content node
	footer, // The footer node
	options // Classes and callbacks. Same options as those passed into the init() function.
);

// Example
var content = document.querySelector('#content');
var footer = document.querySelector('[data-sticky-footer]');
stickyFooter.setContentHeight( content, footer );
```

#### destroy()
Destroy the current `stickyFooter.init()`. This is called automatically during the init function to remove any existing initializations.

```javascript
stickyFooter.destroy();
```

<hr>


## Right Height

Dynamically set content areas of different lengths to the same height.

<div class="row js-right-height">
	<div class="grid-third">
		<div class="demo-grid-bg js-right-height-content">
			<h2>Content 1</h2>
			<p>The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs.</p>
		</div>
	</div>
	<div class="grid-third">
		<div class="demo-grid-bg js-right-height-content">
			<h2>Content 2</h2>
			<p>Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz.</p>
		</div>
	</div>
	<div class="grid-third">
		<div class="demo-grid-bg js-right-height-content">
			<h2>Content 3</h2>
			<p>Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls.</p>
		</div>
	</div>
</div>

### Getting Started

#### Markup

Add the `.js-right-height` class to the wrapper div for your content areas. This let's Right Height adjust heights for different sections of content independently from each other. Give each content area that you want Right Height to adjust a `.js-right-height-content` class.

```markup
<div class="row js-right-height">
	<div class="grid-third js-right-height-content">
		Content 1
	</div>
	<div class="grid-third js-right-height-content">
		Content 2
	</div>
	<div class="grid-third js-right-height-content">
		Content 3
	</div>
</div>
```

#### JavaScript

The script will not run until initialized. This is done for you already in the *Body JavaScript* section of *Portal Setup* in the Dashboard.

```markup
<script>
	portalReady(function () {
		rightHeight.init({
			selector: '.js-right-height',
			selectorContent: '.js-right-height-content',
		});
	});
</script>
```

### Global Settings

You can pass options and callbacks into Right Height through the `init()` function:

```javascript
rightHeight.init({
	selector: '[data-right-height]', // Selector for the right height parent container
	selectorContent: '[data-right-height-content]', // Selector for right height content areas
	callback: function () {} // Function to run after height is adjusted
});
```

### Use Right Height events in your own scripts

You can also call the Right Height adjust height function in your own scripts.

#### adjustContainerHeight()
Set all content areas in a container to the same height.

```javascript
rightHeight.adjustContainerHeight(
	container, // Node that contains the content areas. ex. document.querySelector('#content-wrapper')
	options // Callbacks. Same options as those passed into the init() function.
);

// Example
var container = document.querySelector('#container');
rightHeight.adjustContainerHeight( container );
```

#### destroy()
Destroy the current `rightHeight.init()`. This is called automatically during the init function to remove any existing initializations.

```javascript
rightHeight.destroy();
```

<hr>


## Expand-and-Collapse Widgets

Add simple expand-and-collapse widgets and accordions.

**Collapsed by Default**

<div class="collapse" id="show-me">
	Now you see me, now you don't.
</div>

<p>
	<a class="collapse-toggle" data-collapse href="#show-me">
		<span class="collapse-text-show">Show +</span>
		<span class="collapse-text-hide">Hide -</span>
	</a>
</p>

**Expanded by Default**

<p>
	<a class="btn collapse-toggle active" data-collapse href="#hide-me">
		<span class="collapse-text-show">Show</span>
		<span class="collapse-text-hide">Hide</span>
	</a>
</p>

<div class="collapse active" id="hide-me">
	Hide me!
</div>

**Accordions**

<div>
	<a class="collapse-toggle active" data-collapse data-group="accordion" href="#section1">
		Section 1
		<span class="collapse-text-show">+</span>
		<span class="collapse-text-hide">-</span>
	</a><br>
	<div class="collapse active" id="section1">
		<h3>Section 1</h3>
		<p>The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs.</p>
	</div>
	<a class="collapse-toggle" data-collapse data-group="accordion" href="#section2">
		Section 2
		<span class="collapse-text-show">+</span>
		<span class="collapse-text-hide">-</span>
	</a><br>
	<div class="collapse" id="section2">
		<h3>Section 2</h3>
		<p>Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz.</p>
	</div>
	<a class="collapse-toggle" data-collapse data-group="accordion" href="#section3">
		Section 3
		<span class="collapse-text-show">+</span>
		<span class="collapse-text-hide">-</span>
	</a><br>
	<div class="collapse" id="section3">
		<h3>Section 3</h3>
		<p>Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls.</p>
	</div>
</div>

### Getting Started

#### Markup

Add the `.collapse-toggle` class to your toggle element, and the `.collapse` class to your content. You also need to provide an `href` that matches the `id` of the content you want to expand-and-collapse.

```html
<a class="collapse-toggle" href="#show-me">
	<span class="collapse-text-show">Show +</span>
	<span class="collapse-text-hide">Hide -</span>
</a>
<div class="collapse" id="show-me">
	<p>Now you see me, now you don't.</p>
</div>
```

**Expanded by Default**

If you'd prefer to show content by default, include the `.active` class along with the `.collapse` and `.collapse-toggle` classes.

```html
<a class="collapse-toggle active" href="#hide-me">
	<span class="collapse-text-show">Show +</span>
	<span class="collapse-text-hide">Hide -</span>
</a>
<div class="collapse active" id="hide-me">
	<p>Hide me!</p>
</div>
```

**Accordions**

Expand-and-collapse accordion groups are also supported. Add a `[data-group]` attribute to every toggle in the accordion, and make sure they all have the same value. The script will sort out the rest.

```html
<a class="collapse-toggle active" data-group="accordion" href="#section1">
	Section 1
	<span class="collapse-text-show">+</span>
	<span class="collapse-text-hide">-</span>
</a>
<div class="collapse active" id="section1">
	<h3>Section 1</h3>
	<p>The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs.</p>
</div>
<a class="collapse-toggle" data-group="accordion" href="#section2">
	Section 2
	<span class="collapse-text-show">+</span>
	<span class="collapse-text-hide">-</span>
</a>
<div class="collapse" id="section2">
	<h3>Section 2</h3>
	<p>Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz.</p>
</div>
<a class="collapse-toggle" data-group="accordion" href="#section3">
	Section 3
	<span class="collapse-text-show">+</span>
	<span class="collapse-text-hide">-</span>
</a>
<div class="collapse" id="section3">
	<h3>Section 3</h3>
	<p>Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls.</p>
</div>
```

#### JavaScript

The script will not run until initialized. This is done for you already in the *Body JavaScript* section of *Portal Setup* in the Dashboard.

```markup
<script>
	portalReady(function () {
		houdini.init({
	    	selectorToggle: '.collapse-toggle',
	    });
	});
</script>
```

#### TinyMCE Issues

TinyMCE removes data attributes from the markup. In order to use this script as an accordion, you must uncheck the "Use TinyMCE" checkbox in the Content section of the Portal Dashboard.

### Global Settings

You can pass options and callbacks through the `init()` function:

```javascript
houdini.init({
	selectorToggle: '[data-collapse]', // Collapse toggle selector
	selectorContent: '.collapse', // Collapse content selector
	toggleActiveClass: 'active', // Class added to active toggle elements
	contentActiveClass: 'active', // Class added to active content elements
	initClass: 'js-houdini', // Class added to `<html>` element when initiated
	stopVideo: true, // If true, stop any videos that are playing when content is collapsed
	callbackOpen: function ( content, toggle ) {}, // Function that's run after content is expanded
	callbackClose: function ( content, toggle ) {} // Function that's run after content is collapse
});
```

### Use expand-and-collapse events in your own scripts

You can also call the toggle events in your own scripts.

#### openContent()
Expand a closed content area.

```javascript
houdini.openContent(
	contentID, // The ID of the content area to expand. ex. '#content'
	toggle, // Node that toggles the expand and collapse action. ex. document.querySelector('#toggle') [optional]
	options // Classes and callbacks. Same options as those passed into the init() function. [optional]
);
```

**Examples**

```javascript
houdini.openContent( '#show-me' );
houdini.openContent( '#show-me-too', document.querySelector( 'a[href*="#show-me-too"]' ) );
```

#### closeContent()
Expand a closed content area.

```javascript
houdini.closeContent(
	contentID, // The ID of the content area to collapse. ex. '#content'
	toggle, // Node that toggles the expand and collapse action. ex. document.querySelector('#toggle') [optional]
	options // Classes and callbacks. Same options as those passed into the init() function. [optional]
);
```

**Examples**

```javascript
houdini.closeContent( '#hide-me' );
houdini.closeContent( '#hide-me-too', document.querySelector( 'a[href*="#show-me-too"]' ) );
```

#### destroy()
Destroy the current `houdini.init()`. This is called automatically during the init function to remove any existing initializations.

```javascript
houdini.destroy();
```

<hr>


## Expand-and-Collapse for the Documentation Subnav

While you cannot directly modify the markup in your documenation subnav, adding expand-and-collapse functionality is as simple as running a JavaScript method.

```javascript
portalReady(function () {
	houdiniSubnav.init();
});
```

You can customize the appearance of your subnav using a few simple settings:

```javascript
houdiniSubnav.init({
	selectorNav: '#sub > ul', // Navigation selector
	selectorNavs: '#sub > ul > li', // Navigation items selector
	isAccordion: false, // If true, activates the accordion functionality
	iconShow: '+', // The icon for showing hidden content
	iconHide: '&ndash;', // The icon for hiding visibile content
	iconAfter: true, // If true, displays the hide/show icons after the link text
	iconMargin: '0.5em', // The amount of space between the icon and the page link
	initClass: 'js-houdini-subnav', // The JS class to the `html` element on init
});
```

<hr>


## Toggle Tabs

Light weight toggle tabs.

<ul class="tabs">
	<li class="active"><a class="js-tab active" href="#taba">Superheroes</a></li>
	<li><a class="js-tab" href="#tabb">Ice Cream</a></li>
	<li><a class="js-tab" href="#tabc">Seasons</a></li>
</ul>

<div class="js-tabs-content">
	<div class="tabs-pane active" id="taba">
		<p><strong>Superheros</strong></p>
		<p>Spiderman, Batman, or Iron Man... which one is your favorite?</p>
	</div>
	<div class="tabs-pane" id="tabb">
		<p><strong>Ice Cream</strong></p>
		<p>Chocolate, vanilla or strawberry?</p>
	</div>
	<div class="tabs-pane" id="tabc">
		<p><strong>Seasons</strong></p>
		<p>Winter, summer, spring or fall?</p>
	</div>
</div>

### Getting Started

#### Markup

For semantic reasons, tab toggles must be links, but can be strutured however you see fit. Make sure that the `href` for each tab toggle matches the id of the target `.tabs-pane`.

Add the `.tabs` class to the tab toggles parent element, and the `.js-tab` class to individual toggles. Add a `.js-tabs-content` class to the tab content group parent element, and the `.tabs-pane` class to individual tab content.

Add the `.active` class to the tab and content that you'd like displayed by default.

```markup
<ul class="tabs">
	<li class="active"><a class="js-tab active" href="#taba">Superheroes</a></li>
	<li><a class="js-tab" href="#tabb">Ice Cream</a></li>
	<li><a class="js-tab" href="#tabc">Seasons</a></li>
</ul>

<div class="js-tabs-content">
	<div class="tabs-pane active" id="taba">
		<p><strong>Superheros</strong></p>
		<p>Spiderman, Batman, or Iron Man... which one is your favorite?</p>
	</div>
	<div class="tabs-pane" id="tabb">
		<p><strong>Ice Cream</strong></p>
		<p>Chocolate, vanilla or strawberry?</p>
	</div>
	<div class="tabs-pane" id="tabc">
		<p><strong>Seasons</strong></p>
		<p>Winter, summer, spring or fall?</p>
	</div>
</div>
```

#### JavaScript

The script will not run until initialized. This is done for you already in the *Body JavaScript* section of *Portal Setup* in the Dashboard.

```markup
<script>
	portalReady(function () {
		tabby.init({
			selectorToggle: '.js-tab',
			selectorToggleGroup: '.tabs',
			selectorContent: '.tabs-pane',
			selectorContentGroup: '.js-tabs-content',
		});
	});
</script>
```

### Global Settings

You can pass options and callbacks into Tabby through the `init()` function:

```javascript
tabby.init({
	selectorToggle: '[data-tab]', // Tab toggle selector
	selectorToggleGroup: '[data-tabs]', // Tab toggle group selector
	selectorContent: '[data-tabs-pane]', // Tab content selector
	selectorContentGroup: '[data-tabs-content]', // Tab content group selector
	toggleActiveClass: 'active', // Class added to active toggle elements
	contentActiveClass: 'active', // Class added to active tab content areas
	initClass: 'js-tabby', // Class added to <html> element when initiated
	stopVideo: true, // [Boolean] If true, stop videos when tab closes
	callback: function ( tabs, toggle ) {} // Function that's run after tab content is toggled
});
```

### Use Tabby events in your own scripts

You can also call toggle events in your own scripts.

### toggleTab()
Show tab content.

```javascript
tabby.toggleTab(
	tabID, // The ID of the tab content area to show. ex. '#content'
	toggle, // Node that toggles the tab action. ex. document.querySelector('#toggle') [optional]
	options, // Classes and callbacks. Same options as those passed into the init() function.
);
```

**Example**

```javascript
tabby.toggleTab( '#tab2' );
tabby.toggleTab( '#tab3', document.querySelector('[data-tab][href*="#tab2"]') );
```

#### destroy()
Destroy the current `tabby.init()`. This is called automatically during the init function to remove any existing initializations.

```javascript
tabby.destroy();
```

<hr>


## Smooth Scroll

Animate scrolling to anchor links.

<p>
	<strong>Linear</strong><br>
	<a class="js-scroll" data-options='{ "easing": "linear" }' href="#bazinga">Linear (no other options)</a><br>
</p>

<p>
	<strong>Ease-In</strong><br>
	<a class="js-scroll" data-options='{ "easing": "easeInQuad" }' href="#bazinga">Quad</a><br>
	<a class="js-scroll" data-options='{ "easing": "easeInCubic" }' href="#bazinga">Cubic</a><br>
	<a class="js-scroll" data-options='{ "easing": "easeInQuart" }' href="#bazinga">Quart</a><br>
	<a class="js-scroll" data-options='{ "easing": "easeInQuint" }' href="#bazinga">Quint</a>
</p>

<p>
	<strong>Ease-In-Out</strong><br>
	<a class="js-scroll" data-options='{ "easing": "easeInOutQuad" }' href="#bazinga">Quad</a><br>
	<a class="js-scroll" data-options='{ "easing": "easeInOutCubic" }' href="#bazinga">Cubic</a><br>
	<a class="js-scroll" data-options='{ "easing": "easeInOutQuart" }' href="#bazinga">Quart</a><br>
	<a class="js-scroll" data-options='{ "easing": "easeInOutQuint" }' href="#bazinga">Quint</a>
</p>

<p>
	<strong>Ease-Out</strong><br>
	<a class="js-scroll" data-options='{ "easing": "easeOutQuad" }' href="#bazinga">Quad</a><br>
	<a class="js-scroll" data-options='{ "easing": "easeOutCubic" }' href="#bazinga">Cubic</a><br>
	<a class="js-scroll" data-options='{ "easing": "easeOutQuart" }' href="#bazinga">Quart</a><br>
	<a class="js-scroll" data-options='{ "easing": "easeOutQuint" }' href="#bazinga">Quint</a>
</p>

<p>
	.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>
	.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>
	.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.
</p>

<p id="bazinga"><a class="js-scroll" href="#1@#%^-bottom">Bazinga!</a></p>

<p>
	.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>
	.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>
	.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.
</p>

<p id="1@#%^-bottom"><a class="js-scroll" data-options='{ "easing": "easeOutCubic" }' href="#smooth-scroll">Back to the top</a></p>

### Getting Started

#### Markup

Turn anchor links into Smooth Scroll links by adding the `.js-scroll` class. Give the anchor location an ID just like you normally would.

```markup
<a class="js-scroll" href="#bazinga">Anchor Link</a>
...
<span id="bazinga">Bazinga!</span>
```

#### JavaScript

The script will not run until initialized. This is done for you already in the *Body JavaScript* section of *Portal Setup* in the Dashboard.

```markup
<script>
	portalReady(function () {
		smoothScroll.init({
			selector: '.js-scroll',
			selectorHeader: '.js-scroll-header',
		});
	});
</script>
```

### Global Settings

You can pass options and callbacks into Smooth Scroll through the `init()` function. Learn more about the different easing patterns and what they do at [easings.net](http://easings.net/).

```javascript
smoothScroll.init({
	selector: '[data-scroll]', // Smooth scroll link selector
	selectorHeader: null, // Selector for a fixed header (if one exists)
	speed: 500, // Integer. How fast to complete the scroll in milliseconds
	easing: 'easeInOutCubic', // Easing pattern to use
	offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
	callback: function () {} // Function to run after scrolling
});
```

### Override settings with data attributes

Smooth Scroll also lets you override global settings on a link-by-link basis using the `[data-options]` data attribute.

```markup
<a class="js-scroll"
   data-options='{
					"speed": 500,
					"easing": "easeInOutCubic",
					"offset": 0
				}'
>
	Anchor Link
</a>
```

***Note:*** *You must use [valid JSON](http://jsonlint.com/) in order for the `data-options` feature to work.*

### Use Smooth Scroll events in your own scripts

You can also call Smooth Scroll's scroll animation events in your own scripts.

#### animateScroll()
Animate scrolling to an anchor.

```javascript
smoothScroll.animateScroll(
    anchor, // ID of the anchor to scroll to, or a position on the page. ex. '#bazinga', 750
    toggle, // Node that toggles the animation, OR an integer. ex. document.querySelector('#toggle')
    options // Classes and callbacks. Same options as those passed into the init() function.
);

// Example 1
smoothScroll.animateScroll( '#bazinga' );

// Example 2
var toggle = document.querySelector('#toggle');
var options = { speed: 1000, easing: 'easeOutCubic' };
smoothScroll.animateScroll( '#bazinga', toggle, options );

// Example 3
smoothScroll.animateScroll( 750 );
```

#### destroy()
Destroy the current `smoothScroll.init()`. This is called automatically during the `init` function to remove any existing initializations.

```javascript
smoothScroll.destroy();
```

### Fixed Headers

Add a `[class="js-scroll"-header]` data attribute to fixed headers. Smooth Scroll will automatically offset scroll distances by the header height. If you have multiple fixed headers, add `[class="js-scroll"-header]` to the last one in the markup.

```markup
<nav class="js-scroll-header">
	...
</nav>
```

<hr>


## Automatic Responsive Tables

Automatically make all tables responsive&mdash;including adding `data-label` attributes.

### Getting Started

The script will not run until initialized.

```markup
<script>
	portalReady(function () {
		responsiveTables.init();
	});
</script>
```

### Global Settings

You can pass options and callbacks into Breadcrumbs through the `init()` function:

```javascript
responsiveTables.init({
	selector: 'table', // The selector to use (defaults to all tables)
	responsiveClass: 'table-responsive', // The responsive tables class
	initClass: 'js-responsive-tables', // Class to add to the <html> element on init
	callback: function () {}, // Callback to run after init successfully run
});
```

### Use Responsive Table events in your own scripts

You can also call the Breadcrumbs functions in your own scripts.

#### destroy()
Destroy the current `responsiveTables.init()`. This is called automatically during the init function to remove any existing initializations.

```javascript
responsiveTables.destroy();
```

<hr>


## Breadcrumbs

Add breadcrumb navigation to all or just select pages of your portal.

### Getting Started

The script will not run until initialized.

```markup
<script>
	portalReady(function () {
		breadcrumbs.init();
	});
</script>
```

### Global Settings

You can pass options and callbacks into Breadcrumbs through the `init()` function:

```javascript
breadcrumbs.init({
	pages: 'all', // Which pages to load breadcrumbs on. {String|Array} [all | docs | page | blog | forum | ioDocs | account]
	exclude: '.dom-landing', // Which pages to explicitly exclude. Must be a valid CSS selector. {String|Array}
	selector: '#page' // Where to add the breadcrumbs.
	docs: 'Documentation', // Label to use for Documentation pages
	ioDocs: 'IO-Docs', // Label to use for IO-Docs pages
	forumAddCategory: 'Add Category', // Label to use for Forum "Add Category" page
	accountMyAccount: 'My Account', // Label to use for "My Account" page
	accountMyKeys: 'My API Keys', // Label to use for "My API Keys" page
	accountMyApps: 'My Applications', // Label to use for "My Applications" page
	memberManage: 'Manage My Account', // Label to use for "Manage My Account" page
	memberEmail: 'Change Email', // Label to use for "Change Email" page
	memberPassword: 'Change Password', // Label to use for "Change Password" page
	initClass: 'js-breadcrumbs', // Class to add to the <html> element on init
	containerClass: 'padding-top-small text-muted link-plain', // Classes to add to the breadcrumbs container
	listClass: 'list-inline list-inline-breadcrumbs', // Classes to add to the breadcrumbs list
	callback: function () {}, // Callback to run after breadcrumbs are added
});
```

### Use Breadcrumbs events in your own scripts

You can also call the Breadcrumbs functions in your own scripts.

#### destroy()
Destroy the current `breadcrumbs.init()`. This is called automatically during the init function to remove any existing initializations.

```javascript
breadcrumbs.destroy();
```

<hr>


## Create Dropdown Menus

The Portal Dashboard only allows you to add single-level navigation elements. Your theme includes a simple JavaScript method you can use to add dropdown menus.

Pass in your navigation structure as an array of objects.

```javascript
createDropdown(
	target,   // The (case insensitive) text label of the menu item that you'd like to add the dropdown to. Ex. 'Documentation'
	dropdown, // An array of objects with the dropdown menu data. Ex. [{text: 'Something', url: '#'}, {text: 'Something Else', url: '#'}]
	nav       // Selector for the nav [optional]
);

// Example
portalReady(function () {
	createDropdown(
		'documentation',
		[
			{
				url: '#1',
				text: 'Link 1'
			},
			{
				url: '#2',
				text: 'Link 2'
			}
		]
	);
});
```

<hr>


## Add more than 6 nav items

The Portal Dashboard only allows you to add 6 primary navigation elements. Your theme includes a simple JavaScript method you can use to add more.

```javascript
addNavItem(
	target, // The (case insensitive) text label of the menu item that you'd like to add the item before or after. Ex. 'Documentation'
	text,   // The text for the menu item
	url,    // The URL for the new menu item
	before, // If true, place new item before target instead of after it [optional]
	nav     // Selector for the nav [optional]
);

// Example
portalReady(function () {
	addNavItem( 'Contact', 'New Link', '#1' );
    addNavItem( 'documentation', 'Another New Link', '#2', true );
});
```

<hr>


## Dynamic IO-Docs API selection

You can force IO-Docs to load a particular API on page load by using the following query string pattern:

```javascript
// Load an API
http://yourdomain.com/io-docs?api=NameOfTheAPI

// Load an API and expand and scroll to a specific method
http://yourdomain.com/io-docs?api=NameOfTheAPI&method=NameOfTheMethod
```

### Getting Started

The script will not run until initialized. The ideal place to do this is in the *Body JavaScript* section of *Portal Setup* in the Dashboard.

```javascript
portalReady(function () {
    toggleIODocs.init();
});
```

### Global Settings

You can pass options and callbacks into Click-to-Highlight through the `init()` function:

```javascript
toggleIODocs.init({
	initClass: 'js-toggle-io-docs', // Class that's added to the HTML element on init
    callback: function ( select, val ) {} // Function that runs after content is highlighted
});
```


### Use toggleIODocs events in your own scripts

You can also call the toggle function in your own scripts.

#### toggle()
Toggle an IO-Docs API.

```javascript
toggleIODocs.toggle(
	api, // The value of the API
	method, // The value of the method
	options // Settings (same ones passed in during init)
);

// Examples
toggleIODocs.toggle( 'Some API' );
toggleIODocs.toggle( 'Some API', 'Some Method' );
```

#### destroy()
Destroy the current `toggleIODocs.init()`. This is called automatically during the init function to remove any existing initializations.

```javascript
toggleIODocs.destroy();
```

<hr>


## Manipulating the DOM

Because the Portal limits your ability to change markup in many areas, your theme includes a collection of lightweight helper methods that let you load, move, and manipulate DOM elements to work the way you need them to. View working examples in your `header.js` file.

### removeCSS()

Remove default stylesheets.

```javascript
/**
 * @param  {String} filename The name of the stylesheet to remove
 * @return {Object}          The stylesheet that was removed
 */
removeCSS( filename );

// Example
removeCSS( 'Mashery-base.css' );
```

### loadCSS()
Asynchronously load a CSS file. [Authored by the Filament Group.](https://github.com/filamentgroup/loadCSS)

```javascript
/**
 * @param  {String} href   The URL for your CSS file.
 * @param  {Object} before Optionally defines the element we'll use as a reference for injecting our link.
 * @param  {String} media  CSS media type (default: All).
 * @return {Object}        The stylesheet.
 */
loadCSS( href, before, media );

// Example
loadCSS( 'http://fonts.googleapis.com/css?family=Open+Sans' );
```

### fontFaceObserver()

A small `@font-face` loader. Use in conjuction with [loadCSS](#loadcss-) to avoid [FOIT](https://github.com/filamentgroup/loadCSS/issues/16). [Authored by Bram Stein.](https://github.com/bramstein/fontfaceobserver)

```javascript
// Load the font file
loadCSS('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700');

// If the font is cached, automatically apply it
// Otherwise, wait for it to load
if ( getCookie('fontsLoaded') ) {
	document.documentElement.className += ' fonts-loaded';
} else {
	var font = new FontFaceObserver('Source Sans Pro');
	font.load().then(function () {
		var expires = new Date(+new Date() + (7 * 24 * 60 * 60 * 1000)).toUTCString();
		document.cookie = 'fontsLoaded=true; expires=' + expires;
		document.documentElement.className += ' fonts-loaded';
	});
}
```

```css
body {
	font-family: Helvetica Neue, Arial, sans-serif;
}

.fonts-loaded body {
	font-family: 'PT Serif', sans-serif;
}
```

### loadJS()
Asynchronously load a JS file. [Authored by the Filament Group.](https://github.com/filamentgroup/loadJS)

```javascript
/**
 * @param  {String}   src URL of script to load.
 * @param  {Function} cb  Callback to run on completion.
 * @return {String}       The script URL.
 */
loadJS( src, cb );

// Example
if ( !window.jQuery ) {
	loadJS( '//code.jquery.com/jquery-0.8.2.min.js' );
}
```

### loadInline()
Load CSS or JS inline in the header. While the Portal provides the ability to do this inline, this script let's you do so conditionally.

```javascript
/**
 * @param  {String}   elem The CSS or JS to load (with <style> or <script> tags).
 * @param  {Function} cb   Callback to run on completion.
 * @return {Object}        The inlined node.
 */
loadInline( elem, cb );

// Examples
loadInline( '<style>.example { text-align: left; font-weight: bold; }</style>' );
loadInline( '<script>console.log("It works!");</script>' );
```

### loadHTML()
Load HTML anywhere in the DOM. Must be called in the `<body>`.

```javascript
/**
 * @param  {String|Node} html     The markup. If a string, must be enclosed in a single node (ex. <div>, <span>, etc.).
 * @param  {Node}        target   The node to place your HTML before or after.
 * @param  {Boolean}     after    If true, load markup after target node. Else, load before.
 * @param  {Function}    cb       Callback to run after method.
 * @return {Object}               Element in the DOM.
 */
loadHTML( html, selector, after, cb );

// Examples
loadHTML( '<div class="example">Sample Text</div>', document.getElementById( 'page' ) );
loadHTML( '<span class="example-2">Success!</span>', document.querySelect( 'table td:first-child' ), true );
```

### moveElem()
Move an element or its contents to another location in the DOM. Must be called in the `<body>`.

```javascript
/**
 * @param  {Node}     elem      Element to move.
 * @param  {Node}     target    The node to place the node before or after.
 * @param  {Boolean}  innerHTML If true, grabs markup inside node.
 * @param  {Boolean}  after     If true, load markup after target node. Else, load before.
 * @param  {Function} cb        Callback to run after method.
 * @return {Object|String}      Node/markup in the DOM.
 */
moveElem( elem, selector, innerHTML, after, cb );

// Examples
moveElem( document.getElementById( 'example' ), document.getElementById( 'put-elem-here' );
moveElem( document.getElementById( 'example-2' ), document.getElementById( 'put-elem-here-2' ), true );
moveElem( document.getElementById( 'example-3' ), document.getElementById( 'put-elem-here-3' ), false, true );
```

### wrapElem()
Wrap markup around an element in the DOM's content. Must be called in the `<body>`.

```javascript
/**
* @param  {Node}     elem       Element to wrap in markup. Uses querySelector().
* @param  {String}   wrap       Markup to wrap content in. Use {{content}} as content placeholder.
* @param  {Boolean}  innerHTML  If true, grabs markup inside node.
* @param  {Function} cb         Call back to run after method.
* @return {Object}              Element in the DOM.
 */
wrapElem( elem, wrap, innerHTML, cb );

// Example
wrapElem( document.getElementById( 'content' ), '<div class="container">{{content}}</div>', true );
```

<hr>

## Adding code to the `<head>`

While the Mashery CMS does not allow you to directly control the output in the `<head>` element, you can use the *Head JavaScript* section under *Portal Setup* in the Dashboard to add content to this section.

The Portal automatically adds any content added to this section between opening and closing `<script>` tags. You can use this behavior to add non-JS content by closing out the open script tag, adding your markup, and then opening the script tag up again.

```markup
</script><!-- Close script tag -->

<!-- Mobile Screen Resizing -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Favicons -->
<link rel="shortcut icon" href="/files/favicon.ico">
<link rel="icon" sizes="16x16 32x32" href="/files/favicon.ico">

<!-- Reopen script tag -->
<script>
```

<hr>

## Using jQuery

Certain pages on the Portal (like IO-Docs) load jQuery automatically, but most do not. To safely load jQuery onto your Portal without introducing conflicts, use the following method. Using other approaches can cause jQuery to be loaded twice, negatively affect performance, and introduce conflicts.

```javascript
/**
 * Load jQuery
 */
;(function (window, document, undefined) {

	'use strict';

	// If jQuery is already loaded, don't load it again
	if ( window.jQuery ) return;

	// Load jQuery
	loadJS( '//code.jquery.com/jquery-1.8.2.js', function () {
		// Run your jQuery dependent code here
		// You can also call loadJS() again to load additional jQuery-dependent plugins
	});

})(window, document);
```

<hr>

## Best Practices

### Targeting specific pages for styling

The `header.js` file includes a method that adds a unique class to the `<html>` element on each page. This class is prefixed with `.dom-*` and based on the page path. It can be used to target styles and scripts to a specific page.

To target categories of pages (for example, *all* documentation pages), use the `.page-*` class on the `<body>` element.

**JavaScript**

```javascript
if ( document.documentElement.classList.contains( 'dom-landing' ) ) {
	// run a script only on the landing page...
}

if ( document.documentElement.classList.contains( 'dom-docs-example' ) ) {
	// run a script only on the /docs/example page...
}

if ( document.body.classList.contains( 'page-docs' ) ) {
	// run a script only on documentatin pages
}
```

**CSS**

```scss
.dom-landing .some-selector {
	// apply a style only on the landing page...
}

.dom-docs-example .some-selector {
	// apply a style only on the /docs/example page...
}

.page-docs .some-selector {
	// apply a style only on documentation pages
}
```

### Avoiding FOIT

Loading web fonts results in a [Flash of Invisible Text (FOIT)](https://github.com/filamentgroup/loadCSS/issues/16) that leaves the page unusable until it loads (this is a browser problem, not specific to the Portal). Using the included [loadCSS() and fontFaceObserver methods](#fontfaceobserver-) to load your web font and detect when it's available will eliminate FOIT.

### Preserving Data Attributes and SVGs

TinyMCE, which powers the Portal WYSIWYG editor, strips out data attributes the SVG `viewBox` attribute in the markup. In order to use inline SVGs or any components that require data attributes, you must either uncheck the "Use TinyMCE" checkbox in the Content section of the Portal Dashboard, or inject the appropriate data attributes using JavaScript.

<hr>


## Browser Compatibility

Your theme is optimized for modern browsers and IE 9+.

### Vendor Prefixing

Your theme's build system uses [autoprefixer](https://github.com/postcss/autoprefixer), and is configured to only add prefixes if required by the last two versions of a browser. If a feature isn't working (for example, the grid does not work in Firefox 28 and lower), it may simply need a vendor prefix.

For more details on when support for specific features were added to different browsers, consult [Can I Use](http://caniuse.com/).