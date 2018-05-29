// Создаём функцию отрисовки гоночного трека, в качестве аргумента передаём название трека
var Track = function (trackName) {

    var self = this; // Спасаем this и себя от непредвиденных ошибок :)

    // Общие переменные
    self.TrackName = "debug"; // Начальное название гоночного трека
    self.isDisposed = false; // Начальное расположение гоночного трека
    self.state = "loading"; // Начальное состояние - загрузка

    // Сцены отображения карты, всё отображается как пустое
    var scene = null; 
    var camera = null;

    // Данные о карте будут заносится в массив
    var map = [];

    // Информация о круге будет записываться в хеш
    var lap = {
        started: false, // Начало круга, стартовое значение
        times: [0, 0, 0], // Массив, где будут храниться значения о пройденном круге/кругах - [текущее время, время последнего круга, время лучшего круга]
        checkpoint: false, // Контрольная точка, или финиш
        count: 0 // Счётчик кругов
    };

    // Получаем класс для отрисовки текущего значения времени круга в правом верхнем углу
    var timerDisplay = document.getElementById("timeCurrent");

    // Задаём ассоциативный массив, хранящий frames per second (FPS) - количество сменяемых отрисованных кадров за единицу времени
    var timer = {
        animationframe: 0, // Единица времени, за которую значение будет перерисовано
        lastUpdate: performance.now(), // Последнее значение отрисоквки браузером элементов на странице, вызов performance.now() возвращает количество миллисекунд, прошедшее с начала загрузки страницы
        elapsed: 0.0, // Задаём истёкшее время, прошедшее от отрисовки страницы, пока что начальное значение
        updaterate: 0.0 // Скорость обновления перерисовки, пока что начальное значение
    };

    // Информация о текстурах, которые будут встречаться на гоночной трассе
    var target = {
        position: {x: 0, z: 0}, // Позиция ускорителя на гоночном треке
        tile: {index: 0, x: 0, z: 0} // Размеры ускорителя
    };

    // Информация о текущем ускорителе, через который проходит карт
    var current = {
        tile: {index: 0} // Размеры ускорителя
    };


    // Хеш, хранящий значения игрока и физику
    var player = {
        position: new THREE.Vector3 (0, 0.5, 0), // Создаём начальную позицию вектора, по оси y на 0,5 координаты (будет располагаться точка y)
        speed: 0, // Начальная скорость карта
        turnspeed: 0, // Скорость разворота карта
        angle: 0 // Угол наклона карта
    };

    var limits = racers[racer].limits; // Создаём переменную, в которой будет храниться значение хеша характеристик карта (скорость, торможение и т. д.)

    // Счётчик загрузки, жёстко закодированный для начала
    var loadingstack = 8;

    // Assets - наборы (хеши), хранящие значения об отрисованной графике
    // Хэш, в котором находятся значения текстур, в нём есть начальные сведения о гоночном треке, машине, что будет находится за границами карты, сведения о небе и задний фон, хранящийся в массиве
    var textures = {
        map: undefined, kart: undefined, outOfBounds: undefined, skyBox: undefined, background: []
    };

    // Хэш, в котором находятся значения материалов, в нём есть начальные сведения о гоночном треке, машине, что будет находится за границами карты, сведения о небе и задний фон, хранящийся в массиве
    var materials = {
        map: undefined, kart: undefined, outOfBounds: undefined, skyBox: undefined, background: []
    };

    // Хэш, в котором находятся значения сетки, в нём есть начальные сведения о гоночном треке, машине, что будет находится за границами карты, сведения о небе, хранящиеся в массиве и задний фон, хранящийся в массиве
    var meshes = {
        map: undefined, kart: undefined, outOfBounds: undefined, skyBox: [], background: []
    };

    // Хэш, в котором находятся значения геометрии, в нём есть начальные сведения о гоночном треке, машине, что будет находится за границами карты, сведения о небе и задний фон, хранящийся в массиве
    var geometry = {
        map: undefined, kart: undefined, outOfBounds: undefined, skyBox: undefined, background: undefined
    };

    // Главный класс
    this.Track = function () {

        // Ставим обработку исключений на событие начального отображения гоночного трека и отображение карта, если возникнет исключение - будет изображён экран загрузки
        try {
            ga('send', 'event', 'Race', trackName + "_" + racer);
        } catch (e) {
        }

        document.getElementById("loading").style.display = "flex"; // Отрисовываем экран загрузки, перед тем, как игра будет запущена и трек будет отображён

        // Сбрасываем все таймеры в начале игры, как только открылся экран и действие должно начаться
        document.getElementById("timeCurrent").innerText = "00:00"; // Сбрасываем текущее время, отображаемое в правом верхнем углу
        document.getElementById("timeBest").innerText = "00:00"; // Сбрасываем лучшее время
        document.getElementById("timeLast").innerText = "00:00"; // Сбрасываем время последнего пройденного круга
        document.getElementById("currentLap").innerHTML = ("0000" + lap.count).slice(-4); // Сбрасываем счётчик кругов на 4 значения назад (метод slice)

        // Загружаем все наборы и значения по умолчанию
        this.TrackName = trackName; // Создание и инициализация поля, в котором будет хранится название трека

        setupScene(); // Вызываем функцию загрузки и отрисовки камеры, чтобы был 3D вид
        loadAssets(); // Вызываем функцию загрузки и отрисовки всех текстур

        // Загружаем карту с JSON (JavaScript object notation), которая позволит в виде строки представить значение массива, в котором цифрами задано отображение набора
        
        // Значение цифр следующее:
        // 0 - Дорога гоночного трека
        // 1 - Граница карты, черные квадратики и преграы на трассе, от которых карт отпружинивает при столкновении
        // 2 - Трава, при въезде на которую карт теряет скорость
        // 3 - Ускорители, жёлтые квадраты на трассе
        // 4 - Линия финиша
        // 5 - Вырез в траве и гоночном треке, связывающий препятствие и траву
        xhr = new XMLHttpRequest(); // Объявляем объект XMLHttpRequest (или, как его кратко называют, «XHR»), который дает возможность из JavaScript делать HTTP-запросы к серверу без перезагрузки страницы
        xhr.open("GET", "tracks/" + self.TrackName + "/map.json", true); // Конфигурируем его: GET-запрос на URL 'map.json', в зависимости от той папки с гоночным треком, где лежит карта
        xhr.onreadystatechange = function () { // onreadystatechange содержит обработчик события, вызываемый когда происходит событие readystatechange, всякий раз  когда свойство readyState запроса XMLHttpRequest изменяется
            if (xhr.readyState == 4 && xhr.status == 200) { // Если код сервера 200, то всё ОК, 4 - состояние, что запрос завершен
                var json = JSON.parse(xhr.responseText); // Преобразует строку в формате JSON в соответствующее ей значение
                
                // Сохраняем данные карты в JSON
                map = json.tiles;

                // Устанавливаем начальную позицию, высчитываем позицию тображения вектора
                player.position = new THREE.Vector3 (-50 + Math.floor((json.start[0] * (100 / 128))) + 0.8, 0.5, -50 + Math.floor((json.start[1] * (100 / 128))) - 0.39);

                // Устанавливаем угол с которого игрок будет смотреть
                player.angle = -json.start[2];

                // Запускаем функцию обновления экрана
                render();
            }
        };
        xhr.send(); // Отсылаем AJAX запрос на сервер

    };

    // Функция обновления текстур, в качестве аргумента передаём время от отрисовки страницы
    function update(elapsed) {

        // Убеждаемся что мы не обновляем игру, если карта уже расположена и отрисована
        if (!self.isDisposed) {

            // Отладка: имитируем более высокий уровень fps
            //elapsed /= 4;

            // Отладка: имитируем более низкий уровень fps
            //elapsed /= 0.5;

            // Рассчитаем, насколько быстро игра будет работать
            timer.updaterate = ((1 / (1 / 60)) * elapsed / 1000);

            // Переключаемся в меню паузы
            if (self.state == "running" && input.start) { // Если начальное состояние запущено
                input.start = false; // Выключаем отображение
                pause(); // Ставим выполнение кода на паузу
            } else if (self.state == "paused" && input.start) { // Если начальное состояние на паузе
                input.start = false; pause();
                unpause(); // Снимаем с паузы код
            }

            // Обновляем игру, если она не загружается или не приостанавливается
            if (self.state == "running") { // Проверяем, если состояние запущенное

                // Устанавливаем значение проигрывателя анимации
                timer.animationframe = (timer.animationframe + 1) % 60;

                // Обновляем последнее время круга
                lap.times[0] += elapsed; 

                // Управление картом (рулевое управление)
                if (input.left) { // Если нажата клавиша влево
                    if (timer.updaterate < 1) { // Если скорость обновления перерисовки меньше 1
                        player.turnspeed += (limits.turnSpeed); // Высчитываем скорость разворота карта
                    } else { 
                        player.turnspeed += (limits.turnSpeed * timer.updaterate); // Высчитываем скорость разворота карта, путем умножения скорости разворота, на обновление перерисовки
                    }
                    
                    textures.kart.offset.x = 0.5; // Значение исходя из предыдущего значения нажатой клавиши, то есть левой
                } else if (input.right) { // Если нажата клавиша вправо
                    if (timer.updaterate < 1) { // Если скорость обновления перерисовки меньше 1
                        player.turnspeed -= (limits.turnSpeed); // Высчитываем скорость разворота карта
                    } else {
                        player.turnspeed -= (limits.turnSpeed * timer.updaterate); // Высчитываем скорость разворота карта, путем умножения скорости разворота, на обновление перерисовки
                    }

                    textures.kart.offset.x = 0.75; // Значение исходя из предыдущего значения нажатой клавиши, то есть правой
                } else {
                    // Если игрок не рулюет, или отустил кнопки
                    // Скорость разворота равна скорости разворота разделить на 1 + значение трения при развороте, умноженное на скорость обновления перерисовки
                    player.turnspeed = player.turnspeed / (1 + (limits.turnFriction * timer.updaterate));
                    if (player.speed > 0.2) { // Если скорость карта больше 0,2
                        if (timer.animationframe > 30) { // И если скорость перерисовки больше 30 кадров в секуду
                            textures.kart.offset.x = 0.25; // Задаём смещение по оси X
                        } else {
                            textures.kart.offset.x = 0; // Иначе, смещения нет
                        }
                    } else {
                        textures.kart.offset.x = 0; // Иначе смещения нет
                    }
                }

                // Проезд по жёлтому ускорителю
                // Если индекс ускорителя равен 3 (упоминали выше), то скорость карта равна максимальной определённой скорости карта плюс скорость ускорителя
                if (current.tile.index == 3) player.speed = limits.maxSpeed + limits.maxBoost;

                // Устранение шума заноса при высоких скоростях и маленьких углах
                // Если скорость карта больше 0.2 и скорость разворота (поворота) больше 1.1 или скорость поворота меньше -1.1
                if (player.speed > 0.2 && (player.turnspeed > 1.1 || player.turnspeed < -1.1)) {
                    if (!sfx.skidd.playing()) sfx.skidd.play(); // Включаем звук заноса
                } else { // Иначе выключаем звук заноса
                    if (sfx.skidd.playing()) {
                        sfx.skidd.stop();
                    }
                }

                // Земля под рулём
                // Если скорость поворота больше 0.05 и скорость поворота меньше 0.05, уменьшаем скорость до 0
                if (player.turnspeed > -0.05 && player.turnspeed < 0.05) player.turnspeed = 0;
                
                // Если скорость поворота больше максмальной скорости разворота, ставим максимальную скорость разворота
                if (player.turnspeed > limits.maxTurnSpeed) player.turnspeed = limits.maxTurnSpeed;
                
                // Если скорость поворота меньше отрицательной скорости разворота, ставим отрицательну скорость разворота
                if (player.turnspeed < -limits.maxTurnSpeed) player.turnspeed = -limits.maxTurnSpeed;

                // Поворот карта
                //Угол наклона карта равен углу наклона плюс скорость разворота умноженное на скорость обновления перерисовки
                player.angle += (player.turnspeed * timer.updaterate); 

                // Разгон карта
                if (input.up || input.A) { // Если нажата клавиша вверх или А
                    // Если скорость карта меньше 0.015, ставим скорость равную 0.04
                    if (player.speed < 0.015) player.speed = 0.04;
                    // Скорость карта равна скорости карта умноженной на 1 + скорость разгона умноженная на скорость перирисовки
                    player.speed = player.speed * (1 + (limits.acceleration * timer.updaterate));
                } else if (input.down || input.B) { // Иначе, если нажата клавиша вниз или B 
                    // То, тормозим, скорость больше 0, значит рассчитываем новую скорость карта
                    // Новая скорость карта равна скорости карта делённой на 1 + скорость торможения умноженная на скорость перирисовки
                    if (player.speed > 0) player.speed = player.speed / (1 + (limits.brake * timer.updaterate));
                } else { // Иначе автоматически замедляем
                    // Новая скорость карта равна скорости карта делённой на 1 + скорость трения о поверхность умноженная на скорость перирисовки
                    player.speed = player.speed / (1 + (limits.friction * timer.updaterate));
                }

                // Максимальная скорость карта
                if (player.speed > limits.maxSpeed + 0.1) {
                    // Новая скорость карта равна скорость карта минус скорость карта, умноженная на 0.03 и умноженная на скорость перирисовки
                    player.speed -= (0.03 * timer.updaterate);
                } // Иначе если новая скорость карта больше максимальной скорости
                else if (player.speed > limits.maxSpeed) {
                    player.speed = limits.maxSpeed; // Новая скорость равна максимальной скорости
                }

                // Проверяем, чтобы игрок не катился на масимально низких скоростях, ставим скорость равной 0
                if (player.speed < 0.01 && player.speed > 0) player.speed = 0;

                // Задний ход карта
                // Если нажата клавиша вниз и скорость карта меньше или равна 0
                if (input.down && player.speed <= 0) {
                    player.speed = limits.reverseSpeed; // Ставим, что скорость карта равна задней скорости
                } else { 
                    // Иначе если скорость карта меньше 0, то новая скорость равна прежняя скорость плюс 0.01 умноженное на скорость перерисовки браузером
                    if (player.speed < 0) player.speed += (0.01 * timer.updaterate);
                }

                // Натыкаемся на новый ускоритель на нашем пути
                // Рассчитываем координаты ускорителя на гоночном треке
                target.position.x = player.position.x - ((player.speed * timer.updaterate) * Math.sin(player.angle * Math.PI / 180));
                target.position.z = player.position.z - ((player.speed * timer.updaterate) * Math.cos(player.angle * Math.PI / 180));
                
                // Рассчитываем размеры самого ускорителя
                target.tile.x = Math.floor(128 / 100 * (target.position.x + 50));
                target.tile.z = Math.floor(128 / 100 * (target.position.z + 50));
                target.tile.index = map[target.tile.z][target.tile.x];

                // Проверяем попадает ли игрок на ускоритель
                if (target.position.x > 50 || target.position.x < -50 || target.position.z > 50 || target.position.z < -50 || target.tile.index == 1) {
                    // Проверяем попадает ли игрок в стену или выходит за границы
                    // Отбрасываем назад, если игрок движется и врезается в стену
                    if (player.speed >= 0) { // Если скорость больше 0, умножаем текущую скорость на -1 и смещаем позицию карта назад
                        player.speed = player.speed * -1;
                        // Cмещаем позицию карта назад по оси x назад
                        player.position.x -= (player.speed - 0.15) * Math.sin(player.angle * Math.PI / 180);
                        // Смещаем позицию карта по оси z назад
                        player.position.z -= (player.speed - 0.15) * Math.cos(player.angle * Math.PI / 180);
                        // Дальнейшее движение вперед невозможно
                        input.up = false;
                        input.down = false;
                        // Включаем звук удара о стену
                        if (!sfx.bump.playing()) sfx.bump.play();
                    } else { // Иначе, полная остановка, если игрок пытается въехать в стену (будут дергаться только текстуры)
                        player.speed = 0;
                        input.up = false;
                        input.down = false;
                    }
                } else {
                    // Перебрасываем игрока по ускорителю,  позиция игрока равна позиции ускорителя на карте
                    player.position.x = target.position.x;
                    player.position.z = target.position.z;
                }

                // Если выезжаем на траву, то замедляем скорость движения
                if (target.tile.index == 2 && player.speed > 0.10) player.speed = 0.10;

                // Если проезжаем линию под номером 5 (значения каждого номера указывал выше), ставим контрольную точку равную true
                if (target.tile.index == 5 && current.tile.index != 5) lap.checkpoint = true;

                // Проезжаем линию финиша, а после меняем значения всех счётчиков
                if (target.tile.index == 4 && current.tile.index != 4 && lap.checkpoint) {

                    // Сбрасываем счётчики
                    lap.checkpoint = false;
                    lap.times[1] = lap.times[0];
                    lap.times[0] = 0;
                    if (lap.times[1] < lap.times[2] || lap.times[2] == 0) lap.times[2] = lap.times[1];

                    // Увеличиваем счётчик круга
                    lap.count++;

                    // Ставим значение текущего круга
                    document.getElementById("currentLap").innerText = ("0000" + lap.count).slice(-4);

                    // Обновляем значение последнего и лучшего времени
                    document.getElementById("timeLast").innerText = (lap.times[1] / 1000).toFixed(2);
                    document.getElementById("timeBest").innerText = (lap.times[2] / 1000).toFixed(2);
                    sfx.lap.play();
                }

                // Запускаем таймер на первом круге
                if (target.tile.index == 4 && current.tile.index != 4) {
                    if (!lap.started) {
                        lap.times[0] = 0;
                        lap.started = true;
                    }
                }

                //
                // SFX
                //

                // Если попадаем на жёлтый ускоритель, вызываем звук ускорителя
                if (target.tile.index == 3 && current.tile.index != 3) sfx.woosh.play();

                // Увеличиваем и уменьшаем скорость воспроизведения двигателя и единицу времени за которое значени будет перерисовано (каждые 10 кадров в секунду)
                // Таким образом, экономим память
                if (Math.round(timer.animationframe % 10) == 0) {
                    sfx.engine.rate(1.3 + (player.speed * 2));
                    if (lap.started) timerDisplay.innerText = (lap.times[0] / 1000).toFixed(2);
                }

                // сохраняем значение текущего участка для следующего кадра
                current.tile.index = target.tile.index;

            } else if (self.state == "paused") {
                // Ставим на паузу
            } else if (self.state == "loading") {
                // Или ждём пока все наборы загрузятся
                if (loadingstack <= 0) {
                    document.getElementById("loading").style.display = "none";
                    sfx.engine.fade(0, 1, 500, sfx.engine.play());
                    self.state = "running"; // ставим состояние, что игра запущена
                }
            }
        }
    }

    // Функция отрисовки наборов на странице
    function render() {

        if (!self.isDisposed) { // Если не гоночный трек

            // Получаем время последнего вызова
            timer.elapsed = (performance.now() - timer.lastUpdate);
            timer.lastUpdate = performance.now();

            // Обнавляем влю логику игры
            update(timer.elapsed);

            // Экран обновления пока загружается
            if (self.state != "loading") {

                // Устанавливаем значение позиции карта, 0.4 - позиция по оси y
                meshes.kart.position.set(player.position.x, 0.4, player.position.z);

                // Камеру располагаем позади карта
                meshes.kart.rotation.y = player.angle * (Math.PI / 180);

                // Всегда перемещаем камеру за игроком, рассчитываем координаты и прибавляем позицию игрока
                camera.position.z = Math.cos(player.angle * Math.PI / 180) * 4 + player.position.z;
                camera.position.x = Math.sin(player.angle * Math.PI / 180) * 4 + player.position.x;

                // Камера всегда смотрит на игрока, со всех сторон
                camera.lookAt(new THREE.Vector3(player.position.x, player.position.y + 0.3, player.position.z));

                // Отображаем все на экране
                renderer.render(scene, camera);
            }

            requestAnimationFrame(render); // Запускаем нашу функцию отображения на каждую перерисовку браузером
        }
    }

    // Функция настройки сцены отображения
    function setupScene() {

        // Создаём объект tree.js
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xa0c1f7); // Сцена заднего плана

        // Настройка параметров по умолчанию для камеры (угол, под которым будет показывать игрока 45 градусов)
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.set(0, 1.3, 0);

        // Обновляем камеру при изменении размеров окна или вращении экрана
        window.addEventListener('resize', onWindowResize, false);
        onWindowResize();
    }

    // Функция на изменение окна браузера
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix(); // Обновляем матрицу проекций
        renderer.setSize(window.innerWidth, window.innerHeight); // Устанавливаем размер окна
    }

    // Функция загрузки всех наборов
    function loadAssets() {

        // загруаем звук двигателя
        sfx.engine.load();

        //
        // Отрисовываем гоночный трек
        //
        geometry.map = new THREE.PlaneGeometry(100, 100);
        geometry.map.rotateX(-(Math.PI / 2));
        textures.map = new THREE.TextureLoader().load("tracks/" + self.TrackName + "/map.png", function () { loadingstack -= 1; });
        textures.map.generateMipmaps = false;
        textures.map.minFilter = THREE.NearestFilter;
        textures.map.magFilter = THREE.NearestFilter;
        materials.map = new THREE.MeshBasicMaterial({ map: textures.map });
        meshes.map = new THREE.Mesh(geometry.map, materials.map);
        scene.add(meshes.map);

        //
        // Отрисовываем карт
        //
        geometry.kart = new THREE.PlaneGeometry(0.8, 0.8);
        textures.kart = new THREE.TextureLoader().load("graphics/racers/" + racer + ".png", function () { loadingstack -= 1; });
        textures.kart.generateMipmaps = false;
        textures.kart.minFilter = THREE.NearestFilter;
        textures.kart.magFilter = THREE.NearestFilter;
        textures.kart.repeat.set(0.25, 1);
        materials.kart = new THREE.MeshBasicMaterial({ map: textures.kart, transparent: true });
        meshes.kart = new THREE.Mesh(geometry.kart, materials.kart);
        scene.add(meshes.kart);

        //
        // Отрисовываем, что происходит за границами гоночного трека
        //
        geometry.outOfBounds = new THREE.PlaneGeometry(500, 500);
        geometry.outOfBounds.rotateX(-(Math.PI / 2));
        geometry.outOfBounds.translate(0, -0.05, 0);

        textures.outOfBounds = new THREE.TextureLoader().load("tracks/" + self.TrackName + "/default.png", function () { loadingstack -= 1; });
        textures.outOfBounds.generateMipmaps = false;
        textures.outOfBounds.wrapS = THREE.RepeatWrapping;
        textures.outOfBounds.wrapT = THREE.RepeatWrapping;
        textures.outOfBounds.repeat.set(500, 500);
        textures.outOfBounds.minFilter = THREE.NearestFilter;
        textures.outOfBounds.magFilter = THREE.NearestFilter;

        materials.outOfBounds = new THREE.MeshBasicMaterial({ map: textures.outOfBounds });
        meshes.outOfBounds = new THREE.Mesh(geometry.outOfBounds, materials.outOfBounds);
        scene.add(meshes.outOfBounds);

        //
        // Отрисовываем небо, которое расположено в далеке
        //
        geometry.skyBox = new THREE.PlaneGeometry(500, 125);
        textures.skyBox = new THREE.TextureLoader().load("tracks/" + self.TrackName + "/skybox.png", function () { loadingstack -= 1; });
        textures.skyBox.generateMipmaps = false;
        textures.skyBox.minFilter = THREE.NearestFilter;
        textures.skyBox.magFilter = THREE.NearestFilter;
        materials.skyBox = new THREE.MeshBasicMaterial({ map: textures.skyBox });

        for (i = 0; i < 4; i++) {
            meshes.skyBox.push(new THREE.Mesh(geometry.skyBox, materials.skyBox));
            scene.add(meshes.skyBox[i]);
        }

        // Вращаем сетку, в которой хранится значение о небе
        meshes.skyBox[0].position.set(0, 62, -250);
        meshes.skyBox[1].position.set(0, 62, 250);
        meshes.skyBox[1].rotateY(Math.PI);
        meshes.skyBox[2].position.set(-250, 62, 0);
        meshes.skyBox[2].rotateY(Math.PI / 2);
        meshes.skyBox[3].position.set(250, 62, 0);
        meshes.skyBox[3].rotateY(-Math.PI / 2);


        //
        // Отрисовываем небо поблизости
        //
        geometry.background = new THREE.PlaneGeometry(320, 80);
        for (i = 0; i < 4; i++) {
            textures.background.push(new THREE.TextureLoader().load("tracks/" + self.TrackName + "/background_" + i + ".png", function () { loadingstack -= 1; }));
            textures.background[i].generateMipmaps = false;
            textures.background[i].minFilter = THREE.NearestFilter;
            textures.background[i].magFilter = THREE.NearestFilter;

            materials.background.push(new THREE.MeshBasicMaterial({ map: textures.background[i], transparent: true }));
            meshes.background.push(new THREE.Mesh(geometry.background, materials.background[i]));

            scene.add(meshes.background[i]);
        }

        // Вращаем сетку, в которой хранится значение о небе
        meshes.background[0].position.set(0, 40, -160);

        meshes.background[1].position.set(160, 40, 0);
        meshes.background[1].rotateY(-Math.PI / 2);

        meshes.background[2].position.set(0, 40, 160);
        meshes.background[2].rotateY(Math.PI);

        meshes.background[3].position.set(-160, 40, 0);
        meshes.background[3].rotateY(Math.PI / 2);
    }

    // Удаляем сцену, все обработчики событий, загруженные текстуры, сетки и геометрии
    this.dispose = function () {

        self.isDisposed = true;

        window.removeEventListener('resize', onWindowResize, false);

        sfx.engine.fade(1, 0, 500);
        sfx.engine.stop();

        scene.remove(meshes.map);
        geometry.map.dispose();
        textures.map.dispose();
        materials.map.dispose();

        scene.remove(meshes.outOfBounds);
        geometry.outOfBounds.dispose();
        textures.outOfBounds.dispose();
        materials.outOfBounds.dispose();

        scene.remove(meshes.kart);
        geometry.kart.dispose();
        textures.kart.dispose();
        materials.kart.dispose();

        for (i = 0; i < 4; i++) {
            scene.remove(meshes.kart);
        }
        geometry.skyBox.dispose();
        textures.skyBox.dispose();
        materials.skyBox.dispose();

        for (i = 0; i < 4; i++) {
            scene.remove(meshes.background[i]);
            textures.background[i].dispose();
            materials.background[i].dispose();
        }
        geometry.background.dispose();

        scene = null;
        camera = null;

    };


    // Вызываем функцию трек
    this.Track();

};