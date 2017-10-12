/*******************************
TITLE: 배열 일부를 잘라내어 새로운 객체 생성
AUTHOR: Assu
DATE: 2017.05.02
*******************************/
var Users = [{name:'소녀시대',age:20},{name:'걸스데이',age:22},{name:'티아라',age:23},{name:'애프터스쿨',age:25}];

console.log('1. 배열 요소의 수', Users.length);
console.log('2. 원본 Users');
console.dir(Users);

var Users2 = Users.slice(0, 2);
console.log('3. slice()로 잘라낸 후 Users2');       // [ { name: '소녀시대', age: 20 }, { name: '걸스데이', age: 22 } ]
console.dir(Users2);

var Users3 = Users2.slice(1);
console.log('4. slice()로 잘라낸 후 Users3');       // [ { name: '걸스데이', age: 22 } ]
console.dir(Users3);
