
$(document).on('ready', function() {

      $(".lazy").slick({
        infinite: true,              
        autoplay: true,
  		  autoplaySpeed: 3000,
        pauseOnHover: false,
        pauseOnFocus: false,
        fade: true,
  		  cssEase: 'linear', 
      arrows: true,
      prevArrow: $('.prev'),
      nextArrow: $('.next')
      });
    });

$(document).ready(function(){
  $(".navbar-nav").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({scrollTop: top-50}, 1000);
  });
});

$(document).ready(function(){
  $(".main-block").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({scrollTop: top-50}, 1000);
  });
});