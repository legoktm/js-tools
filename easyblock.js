/*
	easyblock.js - Script to quickly block spambots
	By Legoktm, with assistance from Ori.livneh and MZMcBride

	Adds two tabs, "OP: Spambot block" and "Spambot block".
	OP will block for 6 months, and regular will do 3.
	If the user is an account, it will be indefinite.
	The script will forward you to Special:Nuke once done.

	This script very likely may contain bugs, use at your
	own risk.

	Released under the MIT License, see README.txt for details.

*/

if ( mw.config.get('wgPageName').indexOf('Special:Contributions') >= 0 ) {
	var opblock = mw.util.addPortletLink( 'p-cactions', '#',
		'OP: Spambot block', 'ca-easy-block', 'Open proxy spambot block - 6 months'
	);
	var spambot = mw.util.addPortletLink( 'p-cactions', '#',
		'Spambot block', 'ca-easy-block', 'Spambot block - 3 months'
	);
}

// Bind click handler
$( opblock ).click( function () {
	block( true );
	// doSomeStuff();
	//alert( 'It works!' );
});
$( spambot ).click( function () {
	block( false );
	// doSomeStuff();
	//alert( 'It works!' );
});



function block( isproxy ) {
	var api = new mw.Api();
	// lets figure out the username

	var username = mw.util.getParamValue('target') || mw.config.get('wgTitle').substr(14);
	//action=query&list=users&ususers=127.0.0.1
	//action=query&prop=info&intoken=block&titles=User:Bob&format=jsonfm
	api.get( {
		action: 'query',
		list: 'users',
		ususers: username
	}).done( 
		function( data ) {
			var obj = data.query.users[0];
			console.log(obj);
			var exp;
			if ( obj.invalid !== undefined ) {
				exp = isproxy ? '6 months' : '3 months';
			} else {
				exp = 'indefinite';
			}
			api.get( {
				action: 'query',
				prop: 'info',
				intoken: 'block',
				titles: 'aksjdhfksdjhfskdfhsjdhfgsjhdfg', //apparently this works
				format: 'json'
			} ).done( 
				function( data ) {
					var blocktoken = data.query.pages['-1'].blocktoken;
					console.log(blocktoken);
					api.post( {
						action: 'block',
						user: username,
						expiry: exp,
						reason: isproxy ? '{{blocked proxy}}: Spambot' : 'Spambot',
						nocreate: '1',
						anononly: '1',
						autoblock: '1',
						token: blocktoken
					}).done(
						function( data ) {
							window.location = '/wiki/Special:Nuke/' + username;
						}
					);
				}
			);

		}
	);
	
}