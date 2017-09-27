# Loading Additional Stylesheets

The Portal only allows you to load a single stylesheet by default under `Manage > Portal > Portal Settings` in Control Center. There are two techniques you can use to load additional stylesheets.

1. Load additional stylesheets using the [`m$.loadCSS()` method](/docs/read/customizing/API#loadcss) and an appropriate [event hook](/docs/read/customizing/Events).
2. Load it synchronously by posting the following hack into Inline JavaScript: Head JavaScript section under `Manage > Portal > Portal Settings` in Control Center.

	```html
	</script>
	<link rel="stylesheet" href="/files/your-stylesheet.css" media="all">
	<script>
	```