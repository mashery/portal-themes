// Custom logo
portalReady(function () {
    loadCustomLogo( '<img height="51" width="210" alt="TUI" src="/files/logo.png">' );
});


// Run script initializations when the Portal is ready
portalReady(function () {
    astro.init();
    clickToHighlight.init();
    fluidvids.init({
        selector: ['iframe', 'object'], // runs querySelectorAll()
        players: ['www.youtube.com', 'player.vimeo.com'] // players to support
    });
    houdini.init({
        selectorToggle: '.collapse-toggle',
    });
    rightHeight.init({
        selector: '.js-right-height',
        selectorContent: '.js-right-height-content',
    });
    smoothScroll.init({
        selector: '.js-scroll',
        selectorHeader: '.js-scroll-header',
    });
    stickyFooter.init({
        selector: '.js-sticky-footer',
    });
    tabby.init({
        selectorToggle: '.js-tab',
        selectorToggleGroup: '.tabs',
        selectorContent: '.tabs-pane',
        selectorContentGroup: '.js-tabs-content',
    });
    addTableHeaders();
});