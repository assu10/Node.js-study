var Calc = require('./ch04_4_calc01');

var calc = new Calc();
calc.emit('stop');


console.log(Calc.title + '에 stop 이벤트 전달함.');


