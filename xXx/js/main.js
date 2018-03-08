$(document).ready(function(){
    $(window).scroll(function(){  
        if ($(window).scrollTop() > 20 ){
            $(".navbar").css("background", "rgba(47, 47, 47, 0.9)");
        }
        else {
        	$(".navbar").css("background", "transparent");
        }
    });
});

$('.carousel').carousel({
  interval: 7000,
  pause: "false"
})