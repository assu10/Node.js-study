/*******************************
TITLE: 객체의 속성으로 함수 할당
       함수는 변수에 할당할 수 있으므로 객체의 속성으로도 할당가능
AUTHOR: Assu
DATE: 2017.05.02
*******************************/
var Person = {};
Person.age = 20;
Person.name = '소녀시대';
Person.add = function(a, b) {
  return a+b;  
};

console.log('10+10=', Person.add(10, 10));