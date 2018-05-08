var userSername,
	userName,
	userPatronymic,
	userAge,
	userGender,
	userPension;

    while (!userSername) {
    		userSername = prompt('Введите фамилию','');
    } 
    while (!userName) {
           userName = prompt('Введите имя','');
       }
    while (!userPatronymic) {
           userPatronymic = prompt('Введите отчество','');
       }
    while (!userAge) {
           userAge = prompt('Введите возраст в годах','');
       }
	userGender = confirm("Ваш пол - мужской?"),
	userAge = parseInt(userAge);
	var userAgeDay = userAge * 365,
	userAgeOver5Years = userAge + 5;

	if (userGender==true) {userGender="мужской";}
		else {userGender="женский";};

	if (userAge >=60) {userPension="да";}
		else {userPension="нет"};

document.getElementById('anketa').innerHTML = "<b>Ваше ФИО:</b> " + userSername + " "+ userName + " "+ userPatronymic+ "<br>" +"<b>Ваш возраст в годах:</b> " + userAge + "<br>" +	"<b>Ваш возраст в днях:</b> "+ userAgeDay + "<br>" + "<b>Через 5 лет вам будет:</b> "+ userAgeOver5Years + "<br>" +"<b>Ваш пол:</b> " + " "+ userGender +"<br>" + "<b>Вы на пенсии:</b> "+ " " + userPension + "<br>";

