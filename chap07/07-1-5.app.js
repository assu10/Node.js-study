/*******************************
TITLE: 모듈에 대해 알아보기

        07-1-5.exports.js 모듈 파일 불러오기
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

// require() 메서드는 exports가 아닌 module.exports로 설정된 속성을 리턴함
var user = require('./07-1-5.exports');

function showUser() {
    return user.getUser().name + ', ' + user.group.name;
}

console.log('사용자 정보: ', showUser());