
var name= prompt("Введите имя");
var surname= prompt("Введите фамилию");
document.getElementById("my-name").innerHTML = name;
document.getElementById("my-surname").innerHTML = surname;
var x=name;
var z=surname;
    function test() {



	var name= prompt("Введите имя",x);
	var surname= prompt("Введите фамилию",z);

    var n = document.getElementById('my-name');
	var s = document.getElementById('my-surname');
      if (n) {
        n.innerHTML = name;
      }

      if (s) {
        s.innerHTML = surname;
      }

    }

