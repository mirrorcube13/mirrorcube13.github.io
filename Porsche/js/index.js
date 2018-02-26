document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    setInterval(updateClock, 1000);

    createListeners();
});

var arr = ["111", "222", "333", "444"];

var rand = Math.floor(Math.random() * arr.length);



$(function(){
    $("#clock").click(function(){
        alert(arr[rand])})
})


function updateClock() {
    var currentTime = new Date(),
        currentHours = currentTime.getHours(),
        currentMinutes = currentTime.getMinutes(),
        currentSeconds = currentTime.getSeconds();

    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
    currentHours = (currentHours < 10 ? "0" : "") + currentHours;

    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;

    document.getElementById("clock").innerHTML = currentTimeString;


}

function createListeners() {
    document.getElementById("click").addEventListener('click', function() {
        this.classList.toggle("hidden");
        document.getElementById("clack").classList.toggle("hidden");
        document.getElementById("helper-message").innerHTML = "Click again to see field:";
    });

    document.getElementById("clack").addEventListener('click', function() {
        this.classList.remove("hidden");
        document.getElementById("message").classList.remove("hidden");
        document.getElementById("helper-message").innerHTML = "";

    });

    document.getElementById("message").addEventListener('keyup', function(e) {
        if (e.which != 13) {
            return;
        }
        var value = e.target.value;
        if (value !== '') {
            var newLi = document.createElement('li');
            newLi.innerHTML = value;
            document.querySelector('.message-list').appendChild(newLi);
            e.target.value = '';
        }
    });
}