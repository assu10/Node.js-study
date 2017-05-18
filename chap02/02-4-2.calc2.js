/*******************************
TITLE: 계산기 모듈 - module.exports 사용
                    하나의 변수나 함수 또는 객체를 직접 할당
AUTHOR: Assu
DATE: 2017.04.27
*******************************/
var calc = {};
calc.add = function(a, b) {
    return a+b;
};

calc.multi = function(a, b) {
  return a*b;  
};

module.exports = calc;