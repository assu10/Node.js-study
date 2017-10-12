/*******************************
TITLE: 배열 만들고 요소 추가
AUTHOR: Assu
DATE: 2017.05.02
*******************************/
var User = [{name:'소녀시대',age:20}, {name:'걸스데이',age:22}];

User.push({name:'티아라', age:23});

console.log('사용자 수: ', User.length);
console.log('첫번째 사용자 이름: ', User[0].name);
console.dir(User);