/*******************************
TITLE: 자바스크립트의 객체 타입
       객체는 중괄호를 이용해 만들어지며 그 안에 속성 추가 가능
AUTHOR: Assu
DATE: 2017.05.02
*******************************/

var Person = {};
Person['age'] = 20;
Person['name'] = '소녀시대';
Person.mobile = '010-1234-5678';

console.log('나이 : ', Person.age);
console.log('이름 : ', Person.name);
console.log('전화 : ', Person['mobile']);