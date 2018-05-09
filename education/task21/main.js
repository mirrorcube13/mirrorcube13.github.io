'use strict'
var country, capital;
var db ={ country, capital};

function CountriesInput () {
	country = prompt('Введите название страны', '');
	capital = prompt('Введите название столицы', '');
	db.country=country;
	db.capital=capital;
}

function CountriesInfo () {
	alert(db.country);
	alert(db.capital);
}
