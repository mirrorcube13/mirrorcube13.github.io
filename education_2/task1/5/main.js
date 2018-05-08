var arr =[],
N=0,M=10; //диапазон

a=Math.floor(Math.random()*(M-N+1))+N;


for (var i = 0; i <= a; i++) {
	arr[i]=i;
}
var arr=[1,2,3,4,5,6,7];
console.log(arr);

var i=0,j,
dlina= arr.length-1,
pol=Math.ceil((dlina-1)/2);
x=pol-1;




// console.log('длина массива: ' + dlina);
// console.log('длина половины массива: '+ pol);
// console.log(x);
// console.log(arr[pol]);

for (i = x, j = dlina; i >= 0; i--, j--,x--)
{
    var tmp = arr[x];
    arr[x] = arr[j];
    arr[j] = tmp;
}
console.log(arr);


