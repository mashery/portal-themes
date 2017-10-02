var scroll = new SmoothScroll('.category-page #main-wrapper a[href*="#"], .category-docs #main-wrapper a[href*="#"], .category-docs #main-wrapper a[href*="#"], .category-blogall #main-wrapper a[href*="#"], .category-blogsingle #main-wrapper a[href*="#"]', {
	ignore: '.js-scroll-ignore'
});
window.addEventListener('portalBeforeRenderAjax', function removeSmoothScroll () {
	scroll.destroy();
	window.removeEventListener('portalBeforeRenderAjax', removeSmoothScroll, false);
}, false);