var arr =[],
N=0,M=10; //диапазон

a=Math.floor(Math.random()*(M-N+1))+N;


for (var i = 0; i <= a; i++) {
	arr[i]=i;
}
// var arr=[1,2,3,4,5,6,7,8,9];
console.log(arr);

var i=0,j,
dlina= arr.length-1,
pol=Math.ceil((dlina-1)/2),
x,
y=pol+1;


// console.log(pol-1);
// console.log('длина массива: ' + dlina);
// console.log('длина половины массива: '+ pol);
// console.log(arr[pol]);

for (i = 0, j = dlina; i < pol; i++, j--,x--,y++)
{

    var tmp = arr[i];
    arr[i] = arr[pol-1];
    arr[pol-1] = tmp;
    pol--;

    var tmp2 = arr[j];
    arr[j] = arr[y];
    arr[y] = tmp2;

}
console.log(arr);


