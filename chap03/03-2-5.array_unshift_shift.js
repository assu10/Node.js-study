/*******************************
TITLE: 배열 앞에 요소 추가 및 삭제 - unshift(), shift()
AUTHOR: Assu
DATE: 2017.05.02
*******************************/
var Users = [{name:'소녀시대',age:20},{name:'걸스데이',age:22}];
console.log('unshift() 호출 전 배열 요소의 수 : ', Users.length);

Users.unshift({name:'티아라',age:23});

console.log('unshift() 호출 후 배열 요소의 수 : ', Users.length);
console.log('push() 호출 후 배열값: ', Users);

Users.shift();

console.log('shift() 호출 후 배열 요소의 수 : ', Users.length);
console.log('shift() 호출 후 배열값: ', Users);
