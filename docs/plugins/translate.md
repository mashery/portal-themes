# Translate

Add multi-language support to your Mashery developer portal.

<div id="demo-toc"></div>


## Demo

<ul class="list-inline">
	<li><a data-translate="en" href="#">EN</a></li>
	<li><a data-translate="fr" href="#">FR</a></li>
	<li><a data-translate="sp" href="#">SP</a></li>
</ul>

<div class="translate translate-en active">
	<p>Hello, world!</p>
</div>

<div class="translate translate-fr">
	<p>Bonjour le monde!</p>
</div>

<div class="translate translate-sp">
	<p>¡Hola Mundo!</p>
</div>


## Getting Started

### 1. Add language toggles.

Turn any link or button into a language toggle by adding the `[data-translate]` data attribute. The value of this attribute should equal the language it toggles. You can use any naming convention for your languages that you'd like (ex. `en` or `english` for *English*, `fr` or `french` for *French*, and so on).

```html
<a data-translate="en" role="button" href="#">EN</a>
<a data-translate="fr" role="button" href="#">FR</a>
<a data-translate="sp" role="button" href="#">SP</a>

<!-- OR... -->

<button data-translate="english">English</button>
<button data-translate="french">French</button>
<button data-translate="spanish">Spanish</button>
```

*__Note:__ For proper accessiblity for visitors using screen readers and other assistive technology, add `role="button"` if using links.*

### 2. Add language blocks to your content.

Within your editable content areas (like *Custom Pages*, *Documentation*, and *Blog Posts*), add pre-translated blocks of text by adding the `.translate` and  `.translate-*` classes to a `<div>`. The `*` should match one of the `[data-translate]` values in your language toggles.

These language blocks are dynamically shown or hidden based on the visitor's selected language. Make a language block visible by default by adding the `.active` class. Language blocks can contain any content you want, including additional markup.

```html
<div class="translate translate-en active">
	<p>Hello, world!</p>
</div>

<div class="translate translate-fr">
	<p>Bonjour le monde!</p>
</div>

<div class="translate translate-sp">
	<p>¡Hola Mundo!</p>
</div>

<!-- OR... -->

<div class="translate translate-english active">
	<p>Hello, world!</p>
</div>

<div class="translate translate-french">
	<p>Bonjour le monde!</p>
</div>

<div class="translate translate-spanish">
	<p>¡Hola Mundo!</p>
</div>
```

### 3. Create a dictionary of translation definitions.

For areas where you cannot customize markup (such as header navigation, form labels, and documentation navigation), you will need to create a "dictionary" of words to look for and translate.

This is an array of objects. Each object contains a collection of key/value pairs, where the *key* is your language code/name (the one used in your `[data-translate]` toggles) and the *value* is the word or phrase in that language. These are *case sensitive*.

Whatever language you list first will be your default language unless you specify one in the [options and settings](#options-and-settings).

```javascript
var dictionary = [{
	en: 'Documentation',
	fr: 'Documentation',
	sp: 'Documentación'
},
{
	en: 'Interactive API',
	fr: 'API interactive',
	sp: 'API interactiva'
}];
```

You also need to provide a list of selectors for the content areas that you want to translate this way. Separate each selector with a comma, and be as restrictive as possible.

```javascript
// Translate the primary navigation, user navigation, and documentation navigation
var contentSelectors = '#nav-primary-list, #nav-user-list, #nav-docs ul';
```

*__Note:__ If you only want to use pre-translated language blocks, that's fine. You can skip this step.*

### 4. Initialize your translations.

Initialize your translations in a `portalAfterRender` event. And that's it, you're done. Nice work!

```js
window.addEventListener('portalAfterRender', function () {

	var dictionary = [{
		en: 'Documentation',
		fr: 'Documentation',
		sp: 'Documentación'
	},
	{
		en: 'Interactive API',
		fr: 'API interactive',
		sp: 'API interactiva'
	}];

	// Translate the primary navigation, user navigation, and documentation navigation
	var contentSelectors = '#nav-primary-list, #nav-user-list, #nav-docs ul';

	var translate = new Translate({
		contentSelector: contentSelectors,
		dictionary: dictionary
	});

}, false);
```


## Options and Settings

Translate includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into Smooth Scroll when initializing.

```javascript
var scroll = new Translate({
	default: null, // The default language [optional]
	activeClass: 'active', // The class to add to active language blocks and toggles
	langBlockSelector: '.translate', // The selector for language blocks
	langBlockPrefix: '.translate-', // The selector prefix for language-specific language blocks
	contentSelectors: null, // The selectors for targeted content translation
	initClass: 'js-translate', // The class to add to the document when the script initializes
	dictionary: [], // Your disctionary of translation
});
```

### Use Translate events in your own scripts

You can also call Translate's methods in your own scripts.

#### updateOptions()
Update your options and settings.

```javascript
var translate = new Translate();
translate.updateOptions(options);
```

**Example**

```javascript
var translate = new Translate();
translate.updateOptions({
	dictionary: [{
		en: 'Hello',
		fr: 'Bonjour',
		sp: 'Hola'
	}]
});
```

#### saveLang()
Save the chosen language into local storage.

```javascript
var translate = new Translate();
translate.saveLang(lang);
```

**Example**

```javascript
var translate = new Translate();
translate.saveLang('fr');
```

#### getSavedLang()
Get the saved language from local storage.

```javascript
var translate = new Translate();
translate.getSavedLang();
```

**Example**

```javascript
var translate = new Translate();
var lang = translate.getSavedLang();

// Returns "fr"
console.log(lang);
```

#### removeSavedLang()
Remove the saved language from local storage.

```javascript
var translate = new Translate();
translate.removeSavedLang();
```

#### setCurrentLang()
Set the current language. Use this if you programmatically translate content.

```javascript
var translate = new Translate();
translate.setCurrentLang(lang);
```

**Example**

```javascript
var translate = new Translate();
translate.setCurrentLang('sp');
```

#### toggleLangBlock()
Show any content blocks for the current language (and hide all others).


```javascript
var translate = new Translate();
translate.toggleLangBlock(lang);
```

**Example**

```javascript
var translate = new Translate();
translate.toggleLangBlock('fr');
```

#### translateContent()
Translate targeted content into the new language.

```javascript
var translate = new Translate();
translate.translateContent(content, lang);
```

**Example**

```javascript
var translate = new Translate();
translate.translateContent('#nav-primary-list', 'fr');
```

#### activateToggle()
Activate the toggle for the currently selected language.

```javascript
var translate = new Translate();
translate.activateToggle(lang, toggle);
```

**Example**

```javascript
var translate = new Translate();
translate.activateToggle('fr', document.querySelector('[data-translate="fre"]'));
```

#### run()
Run a translation.

```javascript
var translate = new Translate();
translate.run(lang, toggle);
```

**Example**

```javascript
var translate = new Translate();
translate.run('fr', document.querySelector('[data-translate="fre"]'));
```

#### destroy()
Destroy the current `Translate()` instantiation.

```javascript
var translate = new Translate();
translate.destroy();
```