/*******************************
TITLE: Calc - 더하기 함수가 들어있는 계산기 모듈
            프로토타입 객체를 만들고 evnetEmitter를 상속받도록 하기
AUTHOR: Assu
DATE: 2017.05.04
*******************************/
var util = require('util');
var eventEmitter = require('events').EventEmitter;

// 프로토타입 객체
var Calc = function() {
  this.on('stopAssu', function() {
      console.log('Calc에 stopAssu event 전달됨.');
  });
};

// Calc 객체가 이벤트를 처리할 수 있도록 eventEmitter 상속받도록 함.
util.inherits(Calc, eventEmitter);

Calc.prototype.add = function(a, b) {
  return a + b;  
};

module.exports = Calc;
module.exports.title = 'calculator';