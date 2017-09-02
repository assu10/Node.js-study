/*******************************
TITLE: 모듈에 대해 알아보기

        07-1-1.exports.js 모듈 파일 불러오기
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

// require() 메소드를 exports 객체를 리턴하기 때문에 user 변수는 exports 객체를 참조함.
// 즉, user 변수는 exports 객체와 같음.
var user = require('./07-1-1.exports');

function showUser() {
    return user.getUser().name + ', ' + user.group.name;
}

console.log('사용자 정보: ', showUser());