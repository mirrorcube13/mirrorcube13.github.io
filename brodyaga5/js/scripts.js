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

$(document).ready(function(){
    $(window).scroll(function(){  

        // if ($(window).scrollTop() <= 10 ) {
        //   $(".navbar").css("background", "transparent");
        // }
        // else{
        //   $(".navbar").css("background", "rgba(47, 47, 47, 0.9)");
        // }


if ($(window).scrollTop() > 50 ){
            $(".navbar").css("background", "rgba(47, 47, 47, 0.9)");
        }
        else {
            $(".navbar").css("background", "transparent");
        }
    });
});



var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

