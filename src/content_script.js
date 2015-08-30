window.addEventListener('message', function(event) {
	
	// console.log('slslslslsl3')

	if (event.source !== window) {
		return;
	}

	var message = event.data;

	// Only accept messages that we know are ours
	if (typeof message !== 'object' || message === null ) {
		return;
	}

	// console.log( 'message forwared by content-script', message);

	// send the message to "event listeners within your extension/app or a different extension/app.""
	// https://developer.chrome.com/extensions/runtime#method-sendMessage
	chrome.runtime.sendMessage(message);
});
