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



const time = 800;
const step = 1;

function outNum(num, elem) {
  let e = document.querySelector("#out");
  n = 0;
  let t = Math.round(time / (num / step));
  let interval = setInterval(() => {
    n = n + step;
    if (n == num) {
      clearInterval(interval);
    }
    e.innerHTML = n;
  }, t);
}

outNum(10, "#out");
