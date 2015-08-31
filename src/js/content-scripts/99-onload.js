/**
 * code to inject into the inspected page
 */
;(function(){
	
/**
 * define content script namespace
 * @type {Object}
 */
window.Inspect3js	= window.Inspect3js	|| {}


Inspect3js.rafThrottler	= new RafThrottler()

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////
function checkThreeJs() {
	var isThreejsPresent = (window.THREE && window.THREE.REVISION) ? true : false

	if( isThreejsPresent === false ) {
		console.log('three.js not present')
		setTimeout( checkThreeJs, 10 );
		return
	}

	Inspect3js.injectInThreejs();
}

checkThreeJs();

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////


// console.debug('three.js inspector: Injected in THREE.js', window.THREE.REVISION)	


//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////

function onLoad(){
	window.postMessage({
		source: 'ThreejsEditor', 
		method: 'init'
	}, '*');	
}

// signal devtool panel that the injection is completed
if( document.readyState !== 'complete' ){
	window.addEventListener( 'load', onLoad)
}else{
	// if window already got loaded, call onLoad() manually
	onLoad()
}


})()
