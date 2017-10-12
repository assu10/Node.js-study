/*******************************
TITLE: 익명 함수
       함수 선언문이 아니라 함수 표현식으로 추가 (뒤에 세미콜론)
AUTHOR: Assu
DATE: 2017.05.02
*******************************/
var add = function(a, b) {
  return a+b;  
};
var result = add(10, 10);

console.log('10+10=', result);