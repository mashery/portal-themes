# Setup


## Download

There are three ways to use Sparrow on your project:

1. [Download Sparrow](https://github.com/mashery/sparrow/archive/master.zip) directly from GitHub.
2. Clone Sparrow from GitHub: `git@github.com:mashery/sparrow.git`
3. Install Sparrow using your favorite package manager:
	* [NPM](https://www.npmjs.org/): `npm install mashery/sparrow`
	* [Bower](http://bower.io/): `bower install https://github.com/mashery/sparrow.git`
	* [Component](http://component.io/): `component install mashery/sparrow`


<hr>


## Quick Start

1. [Download](#download) and unzip Sparrow.
2. Use `File Manager` (under `Manage` > `Content` in Control Center) to upload your theme files, located in the `dist` folder:
	- `css/main.css`
	- `js/header.js`
	- `js/main.js`
3. Link to your theme files under `Manage` > `Portal` > `Portal Settings` in Control Center:
	- Under `Custom JavaScript File Inclusion` > `Head JavaScript File URL`, add `/files/header.js`.
	- Under `Custom JavaScript File Inclusion` > `Body JavaScript File URL`, add `/files/main.js`.
	- Under `Custom CSS Files` > `Screen Stylesheet URL`, add `/files/main.css`.
4. In `Portal Settings` under `Inline Javascript` > `Head Javascript`, copy-and-paste the contents of `dist/docs/header.js`.
5. In `Portal Settings` under `Inline JavaScript` > `Body JavaScript`, copy-and-paste the contents of `dist/docs/body.js`.
6. In `Portal Settings` under `Footer Copyright`, copy-and-paste the contents of `dist/templates/footer.html`.
7. Click "Save."
8. Head over to `Manage` > `Content` in Control Center and uncheck the box next to `Enable TinyMCE`. Copy-and-paste the contents of `dist/templates/landing-page.html` into the `Custom Pages` default page. For Trial customers, use `dist/templates/landing-page-trial.html` instead.
9. Add the [Pattern Library](#pattern-library).


## Pattern Library

The Pattern Library is the living, interactive documentation for all of the features in Sparrow.

1. Go to `Manage` > `Content` in Control Center.
2. Uncheck the box next to `Enable TinyMCE`.
3. Create a new Custom Page called `Pattern Library`.
4. Copy-and-paste the contents of `dist/templates/pattern-library.html` into the page and publish.
5. Click `Advanced Options`.
6. Restrict access to this page to Portal admins and managers:
	- Scroll down to `Page Visibility`.
	- Select `Administrator` from the dropdown menu.
	- Click `Add another role` and select `API Manager`.
	- Repeat the previous step for `Content Manager` and `Portal Manager`.
7. Change `Draft` to `Published`.
8. Click "Save" to publish.

You can view the Pattern Library on your Portal at `your-portal-url.com/pattern_library`.