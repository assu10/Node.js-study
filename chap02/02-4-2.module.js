/*******************************
TITLE: 모듈 - 더하기함수를 모듈로 분리한 calc.js 모듈 파일을 불러들임.
AUTHOR: Assu
DATE: 2017.04.27
*******************************/
var calc = require('./02-4-2.calc');        // 모듈 파일의 exports가 불러들인 객체임.
console.log('모듈로 분리한 후 - calc.cdd 함수 호출 결과 : %d', calc.multi(10,10));

var calc2 = require('./02-4-2.calc2');
console.log('모듈로 분리한 후 - calc2.add 함수 호출 결과 : %d', calc2.multi(10, 10));