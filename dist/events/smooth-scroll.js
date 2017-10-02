var scroll = new SmoothScroll('.category-page a[href*="#"], .category-docs a[href*="#"], .category-docs a[href*="#"], .category-blogall a[href*="#"], .category-blogsingle a[href*="#"]', {
	ignore: '.js-scroll-ignore'
});
window.addEventListener('portalBeforeRenderAjax', function removeSmoothScroll () {
	scroll.destroy();
	window.removeEventListener('portalBeforeRenderAjax', removeSmoothScroll, false);
}, false);