# Latest Blog Posts

Add a list of the latest blog posts to any page on your Portal.

<div id="plugin-note"></div>

<div id="demo-toc"></div>


## Demo

**Latest Posts**

<div id="latest-blog-posts-container">
	<div class="placeholder placeholder-sentence"></div>
	<div class="placeholder placeholder-sentence"></div>
	<div class="placeholder placeholder-sentence"></div>
</div>


## Getting Started

### 1. Add the markup to your HTML.

Add a div with the `#latest-blog-posts` ID.

```html
<h2>Latest Blog Posts</h2>
<div id="latest-blog-posts"></div>
```

### 2. Initialize Latest Blog Posts.

Initialize Latest Blog Posts in a `portalAfterRender` event by running `latestBlogPosts()`. And that's it, you're done. Nice work!

```js
window.addEventListener('portalAfterRender', function (event) {
	latestBlogPosts();
}, false);
```


## Options and Settings

Latest Blog Posts includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options into Latest Blog Posts when initializing.

```javascript
latestBlogPosts({
	selector: '#latest-blog-posts', // The selector for the div to render the posts into
	listClass: 'latest-blog-posts-list', // The class added to the latest posts list (used for styling)
	count: 5, // The number of posts to display
	excerptLength: 250, // The length of the blog post excerpt in characters
	listType: 'ul', // The list type (`ul` or `ol`)

	// The template for each post
	// Must pass in `post` as an argument and return a string
	// post.author - the post author
	// post.authorUrl - the URL of the author's profile
	// post.excerpt - the excerpt content
	// post.published - the date the post was published
	// post.title - the post title
	// post.url - the post URL
	template: function (post) {
		var template =
			'<li>' +
				'<strong><a href="' + post.url + '">' + post.title + '</a></strong><br>' +
				'<span class="text-muted">By ' + post.author + ' on ' + post.published + '</span><br>' +
				post.excerpt + '...' +
			'</li>';
		return template;
	}
})l
```

## Placeholder Content

You can display placeholder content while Latest Blog Posts fetches your posts. Use the built in `.placeholder` and `.placeholder-*` classes to add gently pulsing placeholder elements.

```html
<h2>Latest Blog Posts</h2>
<div id="latest-blog-posts">
	<div class="placeholder placeholder-heading"></div>

	<div class="placeholder placeholder-sentence"></div>
	<div class="placeholder placeholder-sentence placeholder-sentence-last"></div>

	<div class="placeholder placeholder-paragraph"></div>
</div>
```