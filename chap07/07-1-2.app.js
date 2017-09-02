/*******************************
TITLE: 모듈에 대해 알아보기

        07-1-2.exports.js 모듈 파일 불러오기
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

var user = require('./07-1-2.exports');

// user는 {} 리턴
console.dir(user);

// 오류 발생
// exports에 객체를 할당하였으므로 exports 전역변수에는 아무것도 할당되지 않음.
// require() 호출 시 자바스크립트에서 새로운 변수로 처리함.
// 결국 아무 속성도 없는 {} 객체가 리턴됨

function showUser() {
    return user.getUser().name + ', ' + user.group.name;
}

console.log('사용자 정보: ', showUser());