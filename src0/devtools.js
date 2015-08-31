// Create the panel
// - https://developer.chrome.com/extensions/devtools_panels
chrome.devtools.panels.create( "Three.js Inspector0",
        "images/icon_48.png",
        "panel.html",
        function(panel) {
                // code invoked on panel creation
                console.log('three.js inspector: Panel created')
        }
);

// Create a connection to the background page
// - https://developer.chrome.com/extensions/runtime#method-connect
var backgroundPageConnection = chrome.runtime.connect({
        name: 'panel'
});

backgroundPageConnection.postMessage({
        name: 'init',
        tabId: chrome.devtools.inspectedWindow.tabId
});

backgroundPageConnection.onMessage.addListener(function(msg) {
        // console.log( 'devtools.js', msg );
});
