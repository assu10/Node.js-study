/*******************************
TITLE: 모듈 - 더하기 함수가 메인 자바스크립트 파일에 같이 들어있는 경우
AUTHOR: Assu
DATE: 2017.04.27
*******************************/
var calc = {};                  // calc라는 객체 생성
calc.add = function(a, b) {     // calc 객체에 add 속성 추가
    return a+b;
};

console.log('모듈로 분리하기 전 - calc.add 함수 호출 결과 : %d', calc.add(10,10));