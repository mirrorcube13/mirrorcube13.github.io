$('.carousel').carousel({
	interval: 5000,
	pause: "false"
})

// var hammer = new Hammer(document.querySelector('.carousel'));
// var $carousel = $(".carousel").carousel({"interval":0});
// hammer.get("swipe");
// hammer.on("swipeleft", function(){
//     $carousel.carousel("next");
// });
// hammer.on("swiperight", function(){
//     $carousel.carousel("prev");
// });

// на вверх
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}