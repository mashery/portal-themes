/**
 * modifySSOSignin.js
 * Copyright (c) 2017. TIBCO Software Inc. All Rights Reserved.
 * @description  Updates styling of SSO page
 * @version  1.0.0
 * @author  Chris Ferdinandi
 */
var modifySSOSignin = function () {

	// Only run on login page
	if (!document.body.classList.contains('page-login') || !document.body.classList.contains('login')) return;

	// Get current SSO link
	var ssoLink = document.querySelector('.page-login.login #main .options .sign-in-method a');
	if (!ssoLink) return;

	// Create new content
	var sso = document.createElement('div');
	sso.className = 'padding-top-small';
	sso.innerHTML =
		'<p><a class="btn btn-xlarge" href="' + ssoLink.getAttribute('href') + '">Sign in with SSO</a></p>' +
		'<p><a id="mashery-signin-content-toggle" role="button" href="#">Or sign in with your Mashery ID...</a></p>';

	// Update heading
	var heading = document.querySelector('.page-login #main div.signin h3');
	if (heading) {
		heading.innerHTML = 'Sign in with your Mashery ID';
		heading.classList.add('mashery-signin-content');
		heading.setAttribute('hidden', 'hidden');
		heading.parentNode.insertBefore(sso, heading);
	}

	// Update form
	var form = document.querySelector('.page-login #main div.signin form');
	if (form) {
		form.classList.add('mashery-signin-content');
		form.setAttribute('hidden', 'hidden');
	}

	document.querySelector('#mashery-signin-content-toggle').addEventListener('click', function (event) {
		event.preventDefault();
		event.target.setAttribute('hidden', 'hidden');
		var content = document.querySelectorAll('.mashery-signin-content');
		for (var i = 0; i < content.length; i++) {
			content[i].removeAttribute('hidden');
		}
		var username = document.querySelector('#handle');
		if (username) {
			username.focus();
		}
	}, false);

};