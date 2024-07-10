$(document).ready(function(){
    $("#arrow").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top - 50;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
});


Fancybox.bind('[data-fancybox="gallery"]', {
  // Your custom options
  
});

let valuesDisplays = document.querySelectorAll(".num");
let interval = 1000;

// console.log(valuesDisplays);

valuesDisplays.forEach((valuesDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valuesDisplay.getAttribute
        ("data-val"));

    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function () {
        startValue += 10;
        valuesDisplay.textContent = startValue;
        if (startValue == endValue) {
            clearInterval(counter);
        }
        // body...
    },duration)
})