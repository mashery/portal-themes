/*!
 * githubDocs.js v1.0.1
 * Load documentation from GitHub
 * (c) 2017 TIBCO Software Inc.
 * Written by Chris Ferdinandi
 * All Rights Reserved
 */
var githubDocs=function(t){"use strict";if(window.mashery.globals.github){var e={selector:".content",user:null,repo:null,root:"",runScripts:!1,loading:"<p>Loading...</p>",failMessage:"<p>Unable to load content.</p>"},o=m$.extend(e,t||{});if(o.user&&o.repo){var n=document.querySelector(o.selector);if(n){n.innerHTML=o.loading;var r=function(t){n.innerHTML=m$.convertMarkdown(t),o.runScripts&&n.querySelectorAll("script").forEach((function(t){new Function(t.innerHTML)()})),m$.fixLocation(),"Prism"in window&&Prism.highlightAll(),m$.emitEvent("portalAfterGitHubRender")},i=sessionStorage.getItem("portalGHDocs_"+window.mashery.contentId);i?r(i):atomic.ajax({url:"https://api.github.com/repos/"+o.user+"/"+o.repo+"/contents/"+o.root+mashery.globals.github}).success((function(t){var e=window.atob(t.content);r(e),sessionStorage.setItem("portalGHDocs_"+window.mashery.contentId,e)})).error((function(t){n.innerHTML=o.failMessage,m$.emitEvent("portalAfterGitHubError")}))}}}};