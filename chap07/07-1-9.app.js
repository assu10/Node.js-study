/*******************************
TITLE: 모듈에 대해 알아보기

        07-1-9.exports 파일 사용
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

// 사용 패턴 : exports의 속성에 추가하되 인스턴스 객체를 만들어 할당함

var user = require('./07-1-9.exports').user;

user.printUser();