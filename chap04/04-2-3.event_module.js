/*******************************
TITLE: 계산기
AUTHOR: Assu
DATE: 2017.05.04
******************************/
var Calc = require('./04-2-3.calc');

var calc = new Calc();
calc.emit('stopAssu');

console.log(Calc.title + '에 stopAssu 이벤트 전달함~');