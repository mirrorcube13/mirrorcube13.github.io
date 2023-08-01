// $(document).ready(function(){
//     $(window).scroll(function(){  

//         // if ($(window).scrollTop() <= 10 ) {
//         //   $(".navbar").css("background", "transparent");
//         // }
//         // else{
//         //   $(".navbar").css("background", "rgba(47, 47, 47, 0.9)");
//         // }


// if ($(window).scrollTop() > 50 ){
//             $(".navbar").css("background", "#262f34");
//         }
//         else {
//             $(".navbar").css("background", "transparent");
//         }
//     });
// });





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




var time = 2,
  cc = 1;
$(window).scroll(function() {
  $('#about-us').each(function() {
    var
      cPos = $(this).offset().top,
      topWindow = $(window).scrollTop();
    if (cPos < topWindow + 1000) {
      if (cc < 2) {
        $(".number").addClass("viz");
        $('div').each(function() {
          var
            i = 1,
            num = $(this).data('num'),
            step = 1000 * time / num,
            that = $(this),
            int = setInterval(function() {
              if (i <= num) {
                that.html(i);
              } else {
                cc = cc + 2;
                clearInterval(int);
              }
              i++;
            }, step);
        });
      }
    }
  });
});







Fancybox.bind('[data-fancybox="gallery"]', {
  // Your custom options
  
});