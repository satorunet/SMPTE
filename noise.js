var NOISE = {is_view:0};

NOISE.init = function(){
	var canvas = $('<canvas class=noise style="background:#eee;position:fixed;top:0;left:0;z-index:2" width=100% height=100%></canvas>').get(0);
	var ctx = canvas.getContext('2d');
	$(canvas).hide();
	$("body").append(canvas);

	resize();
	window.onresize = resize;

	function resize() {
	    canvas.width = window.innerWidth;
	    canvas.height = window.innerHeight;
	}

	function noise(ctx) {
		var w = ctx.canvas.width,
		    h = ctx.canvas.height,
		    idata = ctx.createImageData(w, h),
		    buffer32 = new Uint32Array(idata.data.buffer),
		    len = buffer32.length,
		    i = 0;

		    for(; i < len;)
		        buffer32[i++] = ((255 * Math.random())|0) << 24;
		    
		    ctx.putImageData(idata, 0, 0);
	}

	var toggle = true;
	var loopId;

	(function loop() {
	    toggle = !toggle;
	    if (toggle) {
	        requestAnimationFrame(loop);
	        return;
	    }
	    noise(ctx);
			loopId = requestAnimationFrame(loop);
	    $(canvas).prop("loopId",loopId);
	})();

	this.sound_init = function(){
		var b0, b1, b2, b3, b4, b5, b6;
		b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
		var bufferSize = 4096;
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		var ctx = new AudioContext();
		var node = ctx.createScriptProcessor(bufferSize, 1, 1);
		node.onaudioprocess = function(e) {
		    var output = e.outputBuffer.getChannelData(0);
		    for (var i = 0; i < bufferSize; i++) {
		        var white = Math.random() * 2 - 1;
		        b0 = 0.99886 * b0 + white * 0.0555179;
		        b1 = 0.99332 * b1 + white * 0.0750759;
		        b2 = 0.96900 * b2 + white * 0.1538520;
		        b3 = 0.86650 * b3 + white * 0.3104856;
		        b4 = 0.55000 * b4 + white * 0.5329522;
		        b5 = -0.7616 * b5 - white * 0.0168980;
		        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
		        output[i] *= 0.11; // (roughly) compensate for gain
		        b6 = white * 0.115926;
		    }
		}
		this.sound_stop = function(){
			node.disconnect(ctx.destination);
		};

		this.sound_start = function(){
			node.connect(ctx.destination);
		};
	};


	this.stop = function(){
		$("canvas").hide();
		this.sound_stop();
		this.is_view = 0;
	};

	this.start =  function(){
		$("canvas").show();
		this.sound_start();
		this.is_view = 1;
	};
}

export { NOISE };