// build the api documentation tree dynamically off of the retrieved data
function buildDocTree() {
    // get the main navigation div
    var navigationDiv = document.getElementById('nav-docs');

    // make sure we got it before continuing
    if(navigationDiv != undefined) {
        // get the list of UL's holding each section
        var navigationUL = navigationDiv.getElementsByTagName('ul');

        // first go through each UL and make it hidden
        for(var i = 1; i < navigationUL.length; i++) { // starts off at 1 since we want to show the first one
            // local reference of the current ul
            var currentUL = navigationUL[i];

            // make sure we got a valid element
            if(currentUL != undefined) {
                // get the UL's parent which is an LI
                var parentLI = currentUL.parentNode;
                // make sure we got something and it's an LI
                if(parentLI != undefined && parentLI.tagName == 'LI') {
                    // check for the active class
                    if(parentLI.className == 'active current-page' || parentLI.className == 'active' ) {
                        currentUL.style.display = 'block'; // show the UL

                    } else {
                        currentUL.style.display = 'none'; // hide it otherwise
                    }
                }
            }
        }
    }
}


/**
 * Options & Settings
 */

// Logo
portalOptions.logo = '<img height="44" width="180" alt="Mashery Developer API" src="https://dinw9xheo7f2n.cloudfront.net/tibco-mashery.jpg">';

// Favicon
portalOptions.favicon = true;
portalOptions.faviconSizes = '16x16';


/**
 * Portal Templates
 */

// Enable full width layouts
window.portalOptions.templates.page = function () {
    if (mashery.globals.pageFullWidth) {
        return  '<div class="main content" id="main">' +
                    '{{content.main}}' +
                '</div>';
    } else if (mashery.globals.pageWide) {
        return  '<div class="main container content" id="main">' +
                    '<h1>{{content.heading}}</h1>' +
                    '{{content.main}}' +
                '</div>';
    } else {
        return  '<div class="main container container-small content" id="main">' +
                    '<h1>{{content.heading}}</h1>' +
                    '{{content.main}}' +
                '</div>';
    }
};

// Go big with IO Docs
portalOptions.templates.ioDocs =
    '<div class="main container" id="main">' +
        '<h1>{{content.heading}}</h1>' +
        '{{content.main}}' +
        '{{content.form}}' +
    '</div>';

// Add full width classes
window.addEventListener('portalBeforeRender', (function () {
    if (mashery.globals.fullWidth) {
        document.documentElement.classList.add('full-width');
    } else {
        document.documentElement.classList.remove('full-width');
    }

}), false);


/**
 * Load custom typeface
 */
window.addEventListener('portalAfterInit', (function () {
    m$.loadJS('/files/fontfaceobserver.js', (function () {
        m$.loadCSS('https://www.tibco.com/sites/tibco/files/fonts/607642/32893B43A8E61C126.css');
        // m$.loadCSS('https://cloud.typography.com/6097072/7604992/css/fonts.css');
        var fontBody = new FontFaceObserver('Gotham SSm A');
        var fontHeadings = new FontFaceObserver('Gotham A');
        Promise.all([fontBody.load(null, 10000), fontHeadings.load(null, 10000)]).then((function () {
            document.documentElement.classList.add('fonts-loaded');
        }));
    }));
}), false);


/**
 * Initialize plugins
 */
window.addEventListener('portalAfterRender', (function () {
    // Load Portal plugins
    astro.init();
    fluidvids.init({
        selector: ['iframe', 'object'], // runs querySelectorAll()
        players: ['www.youtube.com', 'player.vimeo.com'] // players to support
    });
    var scroll = new SmoothScroll('.category-page a[href*="#"], .category-docs a[href*="#"], .category-docs a[href*="#"], .category-blogall a[href*="#"], .category-blogsingle a[href*="#"]', {
        ignore: '.js-scroll-ignore'
    });
    window.addEventListener('portalBeforeRenderAjax', (function removeSmoothScroll () {
        scroll.destroy();
        window.removeEventListener('portalBeforeRenderAjax', removeSmoothScroll, false);
    }), false);

    // Load papi auth
    if (window.mashery.contentType === 'ioDocs') {
        var waitForIODocs = function () {
            if ('ioDocs' in window) {
                m$.loadJS('/files/ioDocsPapiAuth.js', (function () {
                    ioDocsPapiAuth();
                }));
                return;
            }
            window.requestAnimationFrame(waitForIODocs);
        };
        window.requestAnimationFrame(waitForIODocs);
    }

    // GitHub-Hosted Documentation
    m$.loadJS('/files/githubDocs.min.js', (function () {
        githubDocs({
            user: 'mashery',
            repo: 'portal-themes',
            root: 'docs/', // The root directory for all of my documentation
            failMessage: '<p>Unable to load content. Visit <a target="_blank" href="https://github.com/mashery/portal-themes/tree/master/docs/' + mashery.globals.github + '">https://github.com/mashery/portal-themes/tree/master/docs/' + mashery.globals.github + '</a> to view the documentation.</p>'
        });
    }));

    // BetterDocs.js
    m$.loadJS('/files/betterDocs.min.js', (function () {
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
            langDefault: 'js',
            restrictToPages: 'docs-plugins-better_docs-demo'
        });
        // Self-Destruct
        window.addEventListener('portalBeforeRenderAjax', (function destroyBetterDocs () {
            docs.destroy();
            window.removeEventListener('portalBeforeRender', destroyBetterDocs, false);
        }), false);

    }));

    // Add logged-in/logged-out class
    if (window.mashery.loggedIn) {
        document.documentElement.classList.add('is-logged-in');
        document.documentElement.classList.remove('is-logged-out');
    } else {
        document.documentElement.classList.add('is-logged-out');
        document.documentElement.classList.remove('is-logged-in');
    }


        buildDocTree();
}), false);


/**
 * Automatically Generate Navigation
 */

var generateNavList = function (selector) {
    var list = document.querySelector(selector);
    if (!list) return;
    document.querySelectorAll('#nav-docs .current-page li').forEach((function (item) {
        var newItem = item.cloneNode(true);
        list.append(newItem);
    }));
};

window.addEventListener('portalAfterRender', (function () {
    if (mashery.contentType === 'docs') {
        generateNavList('#content-nav-list');
    }
}), false);


/**
 * Theme Customizer
 */
window.addEventListener('portalAfterRender', (function () {
    m$.loadJS('/files/customizer.min.js', (function () {
        customizer();
    }));
}), false);


/**
 * Plugins Docs Note
 */
var renderDocsNote = function () {
    var note = document.querySelector('#plugin-note');
    if (!note) return;
    note.innerHTML = '<p><em><strong>HEADS UP!</strong> The template and initialization for this plugin are included in the initialization code generated by the <a href="/docs/read/customizing_your_portal/Theme_Builder">Theme Builder</a>. You only need to use this documentation if you want to make modifications.</em></p>';
};
window.addEventListener('portalAfterRender', renderDocsNote, false);
window.addEventListener('portalAfterGitHubRender', renderDocsNote, false);


/**
 * Auto-generate Table of Contents on docs pages
 */
var renderToC = function () {

    /**
     * Add a sub-item to the navigation list
     * @param {Node}   heading     The heading element
     * @param {Number} difference  The difference between the current and last heading
     */
    var addSubItem = function (heading, difference) {
        var toc = '';
        for (var i = Math.abs(difference); i > 0; i--) {
            toc += '<ul>';
        }
        return toc;
    };

    /**
     * Close a sub-item from the navigation list
     * @param {Node}   heading     The heading element
     * @param {Number} difference  The difference between the current and last heading
     */
    var closeSubItem = function (heading, difference) {
        var toc = '';
        for (var i = Math.abs(difference); i > 0; i--) {
            toc += '</li></ul>';
        }
        return toc;
    };

    /**
     * Render the Table of Contents
     */
    var createTOC = function (toc) {

        // Get the content area
        var content = document.querySelector('.content');
        if (!content) return;

        // Variables
        var headings = content.querySelectorAll('h2');
        var list = '';
        var last, current, close;

        headings.forEach((function (heading) {

            // Get current heading position
            current = parseInt(heading.tagName.substring(1), 10);
            close = '</li>';

            // If first loop, set last to current
            if (!last) {
                close = '';
                last = current;
            }

            // Create an ID if the heading is missing one
            if (!heading.id || heading.id.length < 1) {
                heading.id = createID(headings[i]);
            }

            // Get difference between last and current
            var difference = current - last;

            if (difference > 0) {
                list += addSubItem(heading, difference);
            } else if (difference < 0) {
                list += closeSubItem(heading, difference);
            }

            list += close + '<li><a href="#' + heading.id + '">' + heading.textContent + '</a>';

            // Update last position
            last = current;

        }));

        toc.innerHTML = '<h2>In These Docs</h2><ol>' + list + '</ol>';

    };

    var toc = document.querySelector('#demo-toc');
    if (!toc) return;
    createTOC(toc);

};
window.addEventListener('portalAfterRender', renderToC, false);
window.addEventListener('portalAfterGitHubRender', renderToC, false);