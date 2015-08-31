// chrome.extension calls
var connections = {};

console.log('inside background page.')

/**
 * on chrome.onConnect.addListener - to maintains ```connections```
 */
chrome.runtime.onConnect.addListener(function(port) {
        
        console.log('three.js inspector: background page connected')
        
        
        function onMessage(request){
                console.log('incoming message from dev tools page');
                
                // Register initial connection
                if( request.name === 'init' ){
                        connections[request.tabId] = port;
                        console.log('three.js inspector: create connection from devtools to tabId', request.tabId)
                        console.log('request', request)
                        port.onDisconnect.addListener(function(){
                                delete connections[request.tabId];
                        })
                        return;
                }
        }
        
        // Listen to messages sent from the DevTools page
        port.onMessage.addListener(onMessage);
        
});

/**
 * on chrome.runtime.OnMessage to forward message
 */
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


/**
 * chrome.webNavigation.onCommitted to send message to 'inject'
 */
chrome.webNavigation.onCommitted.addListener(function(data) {        
        console.log("onCommitted: " + data.url + ". Frame: " + data.frameId + ". Tab: " + data.tabId);
        
        if( connections[ data.tabId ] ) {
                console.log('has connection', connections[ data.tabId ])
                if( data.frameId === 0 ) {
                        console.log('frameId', data.frameId)
                        connections[ data.tabId ].postMessage( { method: 'inject' } );
                }
        }
});

////////////////////////////////////////////////////////////////////////////////
//              myLogNotification
////////////////////////////////////////////////////////////////////////////////

// function myLogNotification(string){
//         var args = Array.prototype.slice.call(arguments);
//         var options = {
//                 type: "basic",
//                 title: "Three.js Inspector",
//                 message: args.join(' '),
//                 iconUrl: 'images/icon_48.png',
//         };
//         chrome.notifications.create("", options, function(id) {
//                 console.error(chrome.runtime.lastError);
//         });
//         
// }
// 
// window.addEventListener('load', function(){
//         myLogNotification('background page loaded')
// })