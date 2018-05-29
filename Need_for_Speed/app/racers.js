// Главный ассоциативный массив, задающий параметры всех характеристик картов
var racers = {
    // Хеш характеристик карта A
    "kartA": {
        // Хеш значений, характеристики (ключи - значения/ значения - величина)
        limits: {
            maxSpeed: 0.23, // Максимальная скорость
            minSpeed: 0, // Минимальная скорость
            reverseSpeed: -0.01, // Задняя скорость
            maxBoost: 0.45, // Максимальное ускорение от ускорителей
            acceleration: 0.02, // Разгон
            friction: 0.018, // Трение  карта о поверхность
            brake: 0.07, // Тороможение
            maxTurnSpeed: 1.3, // Максимальная скорость разворота
            turnSpeed: 0.1, // Значение скорости поворота
            turnFriction: 0.05 // Значение трения при повороте
        }
    },
    "kartB": {
        limits: {
            maxSpeed: 0.25,
            minSpeed: 0,
            reverseSpeed: -0.01,
            maxBoost: 0.45,
            acceleration: 0.02,
            friction: 0.02,
            brake: 0.07,
            maxTurnSpeed: 1.2,
            turnSpeed: 0.1,
            turnFriction: 0.1
        }
    },
    "kartC": {
        limits: {
            maxSpeed: 0.32,
            minSpeed: 0,
            reverseSpeed: -0.01,
            maxBoost: 0.5,
            acceleration: 0.028,
            friction: 0.02,
            brake: 0.07,
            maxTurnSpeed: 1.1,
            turnSpeed: 0.09,
            turnFriction: 0.1
        }
    },
    "taimi": {
        limits: {
            maxSpeed: 0.27,
            minSpeed: 0,
            reverseSpeed: -0.01,
            maxBoost: 0.45,
            acceleration: 0.02,
            friction: 0.02,
            brake: 0.07,
            maxTurnSpeed: 1.2,
            turnSpeed: 0.1,
            turnFriction: 0.1
        }
    }
}