

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////

// Change the prefix of signals.js library. It is all low case.
var SIGNALS = signals; delete window.signals;

var editor	= new Editor()

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////

var objects = {};
var renderings = {};

	
//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////

console.log( 'starting' );

document.getElementById( 'reload' ).addEventListener( 'click', function( event ) {
	console.log('RELOAD the inspectedWindow')
	chrome.devtools.inspectedWindow.reload( {
		ignoreCache: false
	} );
} );

// to inject the code directly on tab reload
chrome.devtools.inspectedWindow.reload( {
	ignoreCache: false
} );
