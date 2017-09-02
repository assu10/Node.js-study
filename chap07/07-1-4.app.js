/*******************************
TITLE: 모듈에 대해 알아보기

        07-1-4.module.exports.js 모듈 파일 불러오기
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

// require() 메소드를 호출하면 모듈 파일 안에서 module.exports에 할당한 익명 함수가 반환됨.
// 따라서 이 익명 함수를 user 변수에 할당했다면 user()와 같이 소괄호를 붙여 함수 실행 가능.

var user = require('./07-1-4.module.exports');

function showUser() {
    return user().name;
}

console.log('사용자 정보: ', showUser());
