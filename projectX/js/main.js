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


 
$(document).ready(function(){
    $("#arrow").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),

        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
});
