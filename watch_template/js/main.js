    $(document).on('ready', function() {

      $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        cssEase: 'linear'
      });
      $(".lazy").slick({
        infinite: true,              
        autoplay: true,
  		autoplaySpeed: 2000,
        pauseOnHover: false,
        arrows: false,
        fade: true,
  		cssEase: 'linear'
      });
      $(".lazy2").slick({
        infinite: true,              
        autoplay: true,
  		autoplaySpeed: 2000,
        pauseOnHover: false,
        arrows: true,
        fade: true,
  		cssEase: 'linear',
  		lazyLoad: 'ondemand', // ondemand progressive anticipated
   		dots: false,
    	speed: 300,
    	slidesToScroll: 1,
    	arrows: true,
   		prevArrow: $('.prev'),
   		nextArrow: $('.next')




      });

    });




    $('.carousel').carousel({
	interval: 5000,
	pause: "false"
})