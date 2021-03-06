// chrome.devtools calls
chrome.devtools.panels.create( "Three.js Inspector",
        "images/icon_48.png",
        "panel.html",
        function(panel) {
                // code invoked on panel creation
                console.log('three.js inspector: Panel created')
        }
)

// Create a connection to the background page
// - https://developer.chrome.com/extensions/runtime#method-connect
var backgroundPageConnection = chrome.runtime.connect({
        name: 'panel'
});

backgroundPageConnection.postMessage({
        name: 'initInspector',
        jejeSource: 'devtool.js',
        tabId: chrome.devtools.inspectedWindow.tabId
});        

backgroundPageConnection.onMessage.addListener(function(msg) {
        // console.log( 'devtools.js', msg );
});
