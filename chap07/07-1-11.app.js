/*******************************
TITLE: 모듈에 대해 알아보기

        07-1-11.exports 파일 사용
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

// 사용 패턴 : exports에 속성으로 추가하되 인스턴스 객체를 만들어서 할당하는 것이 아니라
//            프로토타입 객체를 정의한 후 할당함

var User = require('./07-1-11.exports').User;
var user = new User('test01', '소녀시대');

user.printUser();