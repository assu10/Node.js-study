/*******************************
TITLE: 모듈에 대해 알아보기

        07-1-10.module.exports 파일 사용
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

// 사용 패턴 : module.exports에 프로토타입 객체를 정의한 후 할당함

var User = require('./07-1-10.module.exports');
var user = new User('test01', '소녀시대');

user.printUser();