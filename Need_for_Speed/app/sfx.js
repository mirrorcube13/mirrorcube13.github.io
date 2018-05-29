﻿// Создаём хеш, который хранит звуковые значения (ключи - названия звуков/ значения - объекты, хранящие непосредственно свои звуки в хеше, доступному по ключу src)
var sfx = {
    "lap": new Howl({ src: ['sounds/lap.mp3'] }), // Звук прохода круга
    "bump": new Howl({ src: ['sounds/bump.mp3'] }), // Звук удара карта
    "click": new Howl({ src: ['sounds/click.mp3'] }), // Звук щелчка выбора
    "woosh": new Howl({ src: ['sounds/woosh.mp3'] }), // Звук проезда по ускорителям
    "skidd": new Howl({ src: ['sounds/skidd.mp3'], loop: true }), // Звук заноса, loop означает, что звук зациклен
    "engine": new Howl({ src: ['sounds/engine.mp3'], loop: true, rate: 1 }) // Звук работы двигателя, loop означает, что звук зациклен, rate - скорость воспроизведения 
}

// Добавляем музыку в отдельный объект, чтобы можно было (в случае, если мы хотим написать позже опцию только для отключения SFX)
var music = new Howl({ src: ['music/Pixelland.mp3'], loop: true });

var volume = 0; //Начальное значение звука

// try catch is needed because safari on iOS acts like a random piece of #$@%@
try {
    if (localStorage.getItem("volume") !== null) {
        volume = parseInt(localStorage.getItem("volume")) % 3;
        if (isNaN(volume) || volume == NaN || volume === undefined || volume === null || volume === NaN) {
            volume = 0;
        }
    }
} catch (e) {
    volume = 0;
}

function toggleVolume() {
    sfx.click.play();
    volume = (volume + 1) % 3;
    setSoundVolume(volume);
}

function setSoundVolume(volume) {

    // no seriously, screw safari
    try {
        localStorage.setItem("volume", volume);
    } catch (e) {
        // could not save volume
    }

    // 0 = default, play music and unmute SFX
    // 1 = No music, stop the entire object to safe some resources
    // 2 = No sound at all, mute SFX and stop music object if it was playing

    if (volume == 0) {
        document.getElementById("volume_1").innerText = "ЗВУК: вкл";
        document.getElementById("volume_2").innerText = "ЗВУК: вкл";
        Howler.mute(false);
        if (!music.playing()) music.play();
    } else if (volume == 1) {
        document.getElementById("volume_1").innerText = "ЗВУК: без музыки";
        document.getElementById("volume_2").innerText = "ЗВУК: без музыки";
        Howler.mute(false);
        if (music.playing()) music.stop();
    } else if (volume == 2) {
        document.getElementById("volume_1").innerText = "ЗВУК: выкл";
        document.getElementById("volume_2").innerText = "ЗВУК: выкл";
        Howler.mute(true);
        if (music.playing()) music.stop();
    } else {

    }
}

setSoundVolume(volume);
