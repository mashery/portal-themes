var docs = new BetterDocs('.content', {
	langs: {
		bash: {
			selector: 'bash',
			title: 'Bash'
		},
		js: {
			selector: 'javascript, js',
			title: 'JavaScript',
		},
		ruby: {
			selector: 'ruby',
			title: 'Ruby'
		},
		python: {
			selector: 'python',
			title: 'Python'
		}
	},
	langDefault: 'js'
});

// Self-Destruct
window.addEventListener('portalBeforeRenderAjax', function destroyBetterDocs () {
	docs.destroy();
	window.removeEventListener('portalBeforeRender', destroyBetterDocs, false);
}, false);