var mas=[1,2,3,4,5];
var k = mas.length;
var p = mas.length-1;


var x = mas[0];
mas[0] = mas[k];
mas[k] = x;

x = mas[1];
mas[1] = mas[p];
mas[p] = x;

alert(mas);
alert(k);
alert(p);
