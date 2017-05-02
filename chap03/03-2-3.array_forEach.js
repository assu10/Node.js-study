/*******************************
TITLE: 배열 안의 모든 요소 하나씩 확인 - for문, forEach
AUTHOR: Assu
DATE: 2017.05.02
*******************************/
var Users = [{name:'소녀시대',age:20},{name:'걸스데이',age:22},{name:'티아라',age:23}];

console.log('배열 요소의 수: ', Users.length);

for (var i=0; i<Users.length; i++) {
    console.log('배열 요소 ' + i + ': ' + Users[i].name);
}

console.log('forEach 구문 사용');
Users.forEach(function(item, index) {
    console.log('배열 요소 ' + index + ': ' + item.name);
});