</script><!-- Close off the open script tag -->

<!-- Force latest available IE rendering engine and Chrome Frame (if installed) -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<!-- Mobile Screen Resizing -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Icons -->
<!-- Learn More: https://github.com/audreyr/favicon-cheat-sheet -->
<link rel="shortcut icon" href="/files/favicon.ico">
<link rel="icon" sizes="16x16 32x32" href="/files/favicon.ico">

<!-- Reopen the script tag -->
<script>

// Custom font
// Load the font file
loadCSS('https://fonts.googleapis.com/css?family=Droid+Sans:400,700');

// If the font is cached, automatically apply it
// Otherwise, wait for it to load
if ( getCookie('fontsLoaded') ) {
    document.documentElement.className += ' fonts-loaded';
} else {
    var font = new FontFaceObserver('Droid Sans');
    font.load().then(function () {
        var expires = new Date(+new Date() + (7 * 24 * 60 * 60 * 1000)).toUTCString();
        document.cookie = 'fontsLoaded=true; expires=' + expires;
        document.documentElement.className += ' fonts-loaded';
    });
}</script><!-- Close off the open script tag -->

<!-- Force latest available IE rendering engine and Chrome Frame (if installed) -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<!-- Mobile Screen Resizing -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Icons -->
<!-- Learn More: https://github.com/audreyr/favicon-cheat-sheet -->
<link rel="shortcut icon" href="/files/favicon.ico">
<link rel="icon" sizes="16x16 32x32" href="/files/favicon.ico">

<!-- Reopen the script tag -->
<script>