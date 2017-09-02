/*******************************
TITLE: 모듈에 대해 알아보기

        07-1-8.module.exports 파일 사용
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

// 사용 패턴 : module.exports에 객체로부터 new 연산자로 생성된 인스턴스 객체를 할당한 수
//            그 인스턴스 객체의 함수 호출함.

var user = require('./07-1-8.module.exports');

user.printUser();