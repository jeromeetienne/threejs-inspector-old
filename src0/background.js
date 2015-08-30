// chrome.extension calls
var connections = {};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
         console.log('incoming message from injected script', request);
        
        // Messages from content scripts should have sender.tab set
        if (sender.tab) {
                var tabId = sender.tab.id;
                if (tabId in connections) {
                        connections[tabId].postMessage(request);
                } else {
                        console.log("Tab not found in connection list.", tabId, request);
                }
        } else {
                console.log("sender.tab not defined.");
        }
        return true;
});

chrome.runtime.onConnect.addListener(function(port) {
        
        console.log('three.js inspector: background page connected')
        
        // Listen to messages sent from the DevTools page
        port.onMessage.addListener(function(request) {
                console.log('incoming message from dev tools page');
                
                // Register initial connection
                if (request.name == 'init') {
                        connections[request.tabId] = port;
                        console.log('three.js inspector: create connection from devtools')
                        port.onDisconnect.addListener(function() {
                                delete connections[request.tabId];
                        });
                        
                        return;
                }
        });
        
});


chrome.webNavigation.onCommitted.addListener(function(data) {        
        console.log("onCommitted: " + data.url + ". Frame: " + data.frameId + ". Tab: " + data.tabId);
        
        if( connections[ data.tabId ] ) {
                if( data.frameId === 0 ) {
                        connections[ data.tabId ].postMessage( { method: 'inject' } );
                }
        }
        
});
