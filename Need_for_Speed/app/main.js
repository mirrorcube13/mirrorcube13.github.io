// Создаём объект класса THREE.WebGLRenderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Задаём текущий размер окна браузера
document.body.appendChild(renderer.domElement); // Добавляем как DOM элемент

// Создаём "выбранный" трек и картинку гонщика
var track = null;
var racer = "kartB";

var mainMenu = document.getElementById("mainMenu"); // получаем ссылку на главный экран

// Загружаем гоночный трек и скрываем главное меню
function loadMap(map) {
    unloadTrack(); 
    document.getElementById("mainMenu").style.display = "none"; // Скрываем главное меню
    track = new Track(map); // Создаём объект класса Track и передаём в качестве значения гоночный трек
}

// Убираем гоночный трек и возвращаемсчя в главное меню
function unloadTrack() {
    sfx.click.play(); // Делаем звук щелчка
    document.getElementById("gameMenu").style.display = "none"; // Скрываем меню гонки
    document.getElementById("mainMenu").style.display = "block"; // Выходим в главное меню
    if (track !== null) { // Если гоночная трасса отрисована
        track.dispose(); // То вызываем функцию dispose() для нашего объекта track, которая удаляет сцену, все обработчики событий, загруженные текстуры, сетки и геометрии
        track = null; // Ставим в нулевое положение
    }
}

// Останавливаем игру из меню или нажатием кнопки
function pause() {
    sfx.click.play(); // Делаем звук щелчка
    track.state = "paused"; // Ставим отображения гоночного трека на паузу
    document.getElementById("gameMenu").style.display = "flex"; // Задаём игровому меню определённые свойства
}

// Возобнавляем игру из меню или нажатием кнопки
function unpause() {
    sfx.click.play(); // Делаем звук щелчка
    track.state = "running"; // Возобновляем отображение гоночного трека
    document.getElementById("gameMenu").style.display = "none"; //Скрываем игроаое меню
}

// Задаём фоновые цвета для каждого меню
var backgroundColors = {
    "title": "#000000", // Чёрный
    "main": "#a02700", // Красно-бордовый
    "racer": "#006900", // Зелёный
    "track": "#00516b", // Тёмно-синий
    "about": "#111111", // Чёрный
    "settings": "#111111" // Чёрный
};

// Показываем меню и переключаемся между фоновой заставкой и самим меню
function showMenu(section) {

    // Устанавливаем новый цвет фона в главном меню (анимирован с помощью CSS)
    mainMenu.style.backgroundColor = backgroundColors[section];

    // Проходим по всем классам popup и скрываем их видимость
    var menus = document.getElementsByClassName("popup");
    for (i = 0; i < menus.length; i++) {
        menus[i].style.display = "none";
    }

    sfx.click.play(); // Активируем звук щелчка при входе в меню
    document.getElementById("menu_" + section).style.display = "block"; //Отображаем меню как блочное
}

// Устанавливаем цвет карта в зависимости от выбора уровня сложности
function setRacer(newRacer) {
    racer = newRacer; // Создаём новый вид гонщика
    showMenu('track'); //В функцию "Показать меню" передаём цвет нашего меню
}

// Связываем события управления кнопками с экранными событиями
document.getElementById("left").addEventListener('touchstart', function (e) { input.left = true; }, false); // Устанавливаем обработчик события на нажатие кнопки влево или области на экране 
document.getElementById("left").addEventListener('touchend', function (e) { input.left = false; }, false); // Устанавливаем обработчик события на нажатие кнопки влево или области на экране

document.getElementById("right").addEventListener('touchstart', function (e) { input.right = true; }, false); // Устанавливаем обработчик события на нажатие кнопки вправо или области на экране
document.getElementById("right").addEventListener('touchend', function (e) { input.right = false; }, false); // Устанавливаем обработчик события на нажатие кнопки вправо или области на экране

document.getElementById("aButton").addEventListener('touchstart', function (e) { input.A = true; input.up = true; }, false); // Устанавливаем обработчик события на нажатие кнопки вверх или области на экране
document.getElementById("aButton").addEventListener('touchend', function (e) { input.A = false; input.up = false; }, false); // Устанавливаем обработчик события на нажатие кнопки вверх или области на экране

document.getElementById("bButton").addEventListener('touchstart', function (e) { input.B = true; input.down = true; }, false); // Устанавливаем обработчик события на нажатие кнопки вниз или области на экране
document.getElementById("bButton").addEventListener('touchend', function (e) { input.B = false; input.down = false; }, false); // Устанавливаем обработчик события на нажатие кнопки вниз или области на экране

// Показываем сенсорные возможности управления только на сенсорных устройствах
window.addEventListener('touchstart', function () { // Возникает при прикосновении пальцем к элементу
    document.getElementById("touch").style.display = "block"; // Ставим блочную видимость всех элементов управления на сенсорном экране
});

// Убираем контекстное меню на сенсорных экранах
window.oncontextmenu = function (event) {
    event.preventDefault(); // Отменяем обработку события по умолчанию
    event.stopPropagation(); // Отменяем распространение события
    return false;
};

// Исправленные ошибки для отображения на устройстве iOS Браузер Safari
document.ontouchmove = function (event) {
    event.preventDefault();
}

// Задаём полноэкранную поддержку для всех браузеров, кроме Safari
function toggleFullscreen() { // Запускаем функцию, открывающую полноэкранный режим, если пользователь нажал на кнопку включения полноэкранного режима
    sfx.click.play();  // Делаем звук щелчка
    var elem = document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) { // Если полноэкранный режим не открыт в Chrome, Mozilla Firefox, Opera, Internet Explorer, открываем
        if (elem.requestFullscreen) {
            elem.requestFullscreen(); // Встроенная функция в html5 API, которая позволяет открыть полноэкранный режим
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen(); // Встроенная функция в html5 API, которая позволяет открыть полноэкранный режим в Internet Explorer
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen(); // Встроенная функция в html5 API, которая позволяет открыть полноэкранный режим в Mozilla Firefox
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);  // Встроенная функция в html5 API, которая позволяет открыть полноэкранный режим в Chrome и Safari
        }
    } else { // Аналогично коду выше, только закрываем полноэкранный режим в браузерах
        if (document.exitFullscreen) {
            document.exitFullscreen(); 
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

// По нажатию на картинку кота, срабатывает функция, которая показывает иконку робота и его скрытую гоночную трассу
function meow() {
    var cats = document.getElementsByClassName("secret");
    for (i = 0; i < cats.length; i++) cats[i].style.display = "block"; // проходим по всем существующим классам secret и ставим им блочную видимость
    sfx.lap.play(); // Делаем звук щелчка
}

// var version = "1.4";