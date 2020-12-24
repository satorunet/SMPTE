var SMPTE = {is_view:0};

SMPTE.init = function(){
	//SMPTE-Scroiing-CSS
	$("body").append(
		'<style>'+
		'body{'+
		'	font-family: sans-serif; '+
		'	margin: 0;'+
		'	background: url("SMPTE_Color_Bars_16x9.svg") ;'+
		'	background-position: center;'+
		'	-webkit-background-size: 1920px 1080px;'+
		'	 background-size:  1920px 1080px;'+
		'	 -webkit-animation: bgscroll 20s linear infinite;'+
		'	 animation: bgscroll 20s linear infinite;'+
		'	user-select: none;-webkit-user-select: none;'+
		'	overflow: hidden;'+
		'	-ms-overflow-style: none;'+
		'	scrollbar-width: none;'+
		'}'+
		'@-webkit-keyframes bgscroll {'+
		' 0% {background-position: 0 0;}'+
		' 100% {background-position: 0 0px;}'+
		'}'+
		'@keyframes bgscroll {'+
		' 0% {background-position: 0 0;}'+
		' 100% {background-position: -1920px 1080px;}'+
		'}'+
		'body::-webkit-scrollbar {display:none;}'+
		'</style>'
	);
}

SMPTE.sound_init = function(){
	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	var ctx = new AudioContext();
	var osc = ctx.createOscillator();
	osc.start = osc.start || osc.noteOn;
	var frequency = parseInt(1000);
	osc.frequency.value = frequency;
	var gainNode = ctx.createGain();
	gainNode.gain.setValueAtTime(0, 0);
	gainNode.gain.linearRampToValueAtTime(1, 1);
	osc.connect(gainNode);
	osc.start(0);

	this.stop = function(){
		gainNode.disconnect(ctx.destination);
		this.is_view = 0;
	};

	this.start = function(){
		gainNode.connect(ctx.destination);
		this.is_view = 1;
	};

};

export { SMPTE };