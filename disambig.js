/*
	disambig.js - Script to update descriptions
	for an item to indicate its a disambiguation
	page.

	Written by Legoktm.

	Released under the MIT License, see README.txt for details.

*/

var data = {
    "descriptions": {
        "gu": {
            "value": "સ્પષ્ટતા પાનું",
            "language": "gu"
        },
        "en": {
            "value": "Wikipedia disambiguation page",
            "language": "en"
        },
        "is": {
            "value": "aðgreiningarsíða á Wikipediu",
            "language": "is"
        },
        "it": {
            "value": "pagina di disambiguazione",
            "language": "it"
        },
        "cs": {
            "value": "rozcestník",
            "language": "cs"
        },
        "gl": {
            "value": "páxina de homónimos",
            "language": "gl"
        },
        "id": {
            "value": "Halaman disambiguasi",
            "language": "id"
        },
        "es": {
            "value": "página de desambiguación",
            "language": "es"
        },
        "ru": {
            "value": "страница значений",
            "language": "ru"
        },
        "nl": {
            "value": "doorverwijspagina",
            "language": "nl"
        },
        "pt": {
            "value": "página de desambiguação",
            "language": "pt"
        },
        "nb": {
            "value": "Wikipedia-pekerside",
            "language": "nb"
        },
        "ca": {
            "value": "Pàgina de desambiguació",
            "language": "ca"
        },
        "fr": {
            "value": "page d'homonymie",
            "language": "fr"
        },
        "de": {
            "value": "Begriffsklärungsseite",
            "language": "de"
        },
        "fa": {
            "value": "صفحه ابهام‌زدایی در ویکی‌پدیا",
            "language": "fa"
        },
        "hi": {
            "value": "बहुविकल्पी पृष्ठ",
            "language": "hi"
        },
        "fi": {
            "value": "täsmennyssivu",
            "language": "fi"
        },
        "ko": {
            "value": "위키백과 동음이의어 문서",
            "language": "ko"
        },
        "ur": {
            "value": "ویکیپیڈیا ضد ابہام صفحہ",
            "language": "ur"
        },
        "ms": {
            "value": "Laman nyahkekaburan",
            "language": "ms"
        },
        "or": {
            "value": "ବହୁବିକଳ୍ପ ପୃଷ୍ଠା",
            "language": "or"
        }
    }
}

if ( mw.config.get( 'wgNamespaceNumber' ) == 0 ) {
	var taggggggger = mw.util.addPortletLink( 'p-cactions', '#',
		'Disambig', 'ca-disambig', 'Update descriptions for a disambig page'
	);
}
$( taggggggger ).click( function () {
	tag();
});


function tag() {
	var api = new mw.Api();
	api.post( {
		action: 'wbeditentity',
		id: mw.config.get( 'wgPageName' ),
		token: mw.user.tokens.get( 'editToken' ),
		bot: 1,
		summary: 'changed descriptions in 22 languages ([[User:legoktm/disambig.js|js]])',
		data: JSON.stringify(data),
	}).done(
		function ( data ) {
			console.log(data);
			window.location = '/wiki/' + mw.config.get( 'wgPageName' );
			mw.notify( 'Changed descriptions in 22 languages. Yay!')
		}
	);
}




