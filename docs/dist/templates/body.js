// Run script initializations when the Portal is ready
portalReady(function () {
    astro.init();
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

// Documentation Updates
portalReady(function () {

    // Only run on docs pages
    if (!document.body.classList.contains('page-docs')) return;

    // Variables
    var main = document.querySelector('#main');
    var subHeading = document.querySelector('#sub h2');

    // Add logged-out message
    if (main && document.documentElement.classList.contains('is-logged-out')) {
        main.innerHTML = '<p><em>Please log in to view our full documentation.</em></p><hr class="no-margin-top">' + main.innerHTML;
    }

    // Change subnav heading
    if (subHeading) {
        subHeading.innerHTML = 'Documentation';
    }

});