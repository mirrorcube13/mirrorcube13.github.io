var name= prompt('Введите имя', ''),
	secondName= prompt('Введите фамилию', ''),
	patronymic= prompt('Введите отчество', ''),
	age = +prompt('Введите возраст', ''),
	gender = confirm('ваш пол - м?');
var pension;

if (gender===true) {
	console.log('М');
	gender='М';
	if (age<60) {pension='нет';}
	else {
		pension='да';
	}
}
else
{
	console.log('Ж');
	gender='Ж';
	if (age<55) {pension='нет';}
	else {
		pension='да';
	}

}

alert('Ваше ФИО: '+ secondName+' '+ name+' '+patronymic+'\n'+
	'Ваш возраст в годах: '+ age +'\n'+
	'Ваш возраст в днях: '+ (age*365)+ '\n'+
	'Через 5 лет вам будет: '+ (age+5)+ '\n'+
	'Ваш пол: '+ gender+ '\n'+
	'Вы на пенсии: '+ pension  );