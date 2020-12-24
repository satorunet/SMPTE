import { SMPTE } from "./smpte.js?201225_v1";
import { NOISE } from "./noise.js?201225_v1";

$(function(){

	SMPTE.init();
	NOISE.init();

	function play_pressed(){
		SMPTE.sound_init();
		NOISE.sound_init();

		SMPTE.start();
		timeInit();

	}

	$("body").click(function(){
		if($(".fg").is(":visible")){
			return;
		}

		if(SMPTE.is_view == 1){
			SMPTE.stop();
			NOISE.start();
		} else {
			NOISE.stop();
			SMPTE.start();
		}
	});


	var fg = $("<div class=fg style='opacity:.5;cursor:pointer;position:fixed;top:0px;left:0px;background:rgba(0,0,0,.5);" + 
	"width:100%;height:100%;text-align:center;font-size:18pt;color:white'>" +
	"<font style='font-size:50pt'>"+
	'<div><i class="fas fa-play"></i> PLAY <i class="fas fa-volume-up"></i></div>'+
	"</font>"+
	"</div>");

	fg.css("padding-top",parseInt(window.innerHeight/2) - 100);

	fg
	.on("mouseenter",function(){
		$(this).animate({"opacity":1});
	})
	.on("mouseleave",function(){
		$(this).animate({"opacity":.5});
	})
	$("body").append(fg);

	$(window).on("orientationchange",function(){
		$(".bg").css("top",0)
		$("body").prepend("<font size=100>"+ $(".bg").css("top") +"</font>");
	})

	$(fg).one("click",function(){
		$(this).fadeOut("fast");
		play_pressed();
	})

	function timeInit(){
		$("body").append("<div class=time style='z-index:3;position:fixed;top:20px;left:20px;color:white;font-size:50pt;text-shadow:#000 0px 0px 5px'></div>");
		setInterval(function(){
			setTime();
		},1000);
		setTime();
	}

	function setTime(){
		$(".time").text(new Date().getHours() + ":" + z(new Date().getMinutes()) );
	}

	function z(n){
		return parseInt(n)<10 ? "0"+n : n;
	}



})

