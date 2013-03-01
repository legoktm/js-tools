/*
	quickwarn.js - Speedy warnings.
	By Legoktm

	Currently this supports:
		*[[Template:uw-vandalism1]]
		*[[Template:uw-link-removal]]

	Eventually more features will be added including blocking.

	Released under the MIT License, see LICENSE.txt.
*/

summaries = {
	'uw-vandalism1': 'Warning for vandalism',
	'uw-link-removal1': 'Warning for removing links'
}


if ( mw.config.get('wgNamespaceNumber') === 3 ) {
	var vandal = mw.util.addPortletLink( 'p-cactions', '#',
		'uw-vandalism1', 'ca-uw-vand', 'uw-vandalism1'
	);
	var linkrmv = mw.util.addPortletLink( 'p-cactions', '#',
		'uw-link-removal1', 'ca-uw-link', 'uw-link-removal1'
	);
}

// Bind click handler
$( vandal ).click( function () {
	warn( 'uw-vandalism1', summaries );
});
$( linkrmv ).click( function () {
	warn( 'uw-link-removal1', summaries );
});



function warn( template, summaries ) {
	var api = new mw.Api();
	api.post( {
		action: 'edit',
		title: mw.config.get( 'wgPageName' ),
		appendtext: '\n{{subst:'+template+'}} ~~~~',
		summary: summaries[template],
		token: mw.user.tokens.get( 'editToken' )
	}).done( 
		function( data ) {
			console.log(data); // for debugging
		}
	);
	
}

