/*******************************
TITLE: 배열의 (중간에 있는)요소 삭제, 요소들을 추가하거나 삭제
        delete 키워드 사용, splice() 메소드 사용
AUTHOR: Assu
DATE: 2017.05.02
*******************************/
var Users = [{name:'소녀시대',age:20},{name:'걸스데이',age:22},{name:'티아라',age:23}];

console.log('1. delete 키워드로 배열 요소 삭제 전 배열 요소의 수 : ', Users.length);

delete Users[1];

console.log('2. delete 키워드로 배열 요소 삭제 후: ');
console.dir(Users);     // [ { name: '소녀시대', age: 20 }, , { name: '티아라', age: 23 } ]


Users.splice(1, 0, {name:'애프터스쿨',age:25});

console.log('3. splice()로 요소를 인덱스 1에 추가한 후');
console.dir(Users);

Users.splice(2, 1);

console.log('4. splice()로 인덱스 1의 요소를 1개 삭제한 후');
console.dir(Users);