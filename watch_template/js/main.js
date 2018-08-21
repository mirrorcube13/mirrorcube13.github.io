    $(document).on('ready', function() {

      $(".regular").slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        cssEase: 'linear',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            centerPadding: '10px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            centerMode: true,
            centerPadding: '10px',
            slidesToShow: 1
          }
        }
      ]
      });

      $(".reviews").slick({
        dots: true,
        arrows:false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        cssEase: 'linear',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            centerPadding: '10px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            centerMode: true,
            centerPadding: '10px',
            slidesToShow: 1
          }
        }
      ]
      });

      $(".lazy").slick({
        infinite: true,              
        autoplay: true,
  		autoplaySpeed: 3000,
        pauseOnHover: false,
        pauseOnFocus: false,
        arrows: false,
        fade: true,
  		cssEase: 'linear'
      });
      $(".lazy2").slick({
        infinite: true,              
        autoplay: true,
  		autoplaySpeed: 2000,
        pauseOnHover: false,
        pauseOnFocus: false,
        arrows: true,
        fade: true,
  		cssEase: 'linear',
  		lazyLoad: 'ondemand', // ondemand progressive anticipated
   		dots: false,
    	speed: 500,
    	slidesToScroll: 1,
    	arrows: true,
   		prevArrow: $('.prev'),
   		nextArrow: $('.next')




      });

    });






$('#Search').click(function(){
  
swal("Введите ключевое слово:", {
  content: "input",button: "Поиск"
})
.then((value) => {
  swal(`Ваш запрос: ${value}`);
});

});
