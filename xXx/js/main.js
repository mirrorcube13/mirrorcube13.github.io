$(document).ready(function(){
    $(window).scroll(function(){  
        if ($(window).scrollTop() > 20 ){
            $(".navbar").css("background", "#2F2F2F");
        }
        else {
        	$(".navbar").css("background", "transparent");
        }
    });
});