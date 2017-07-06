/*******************************
TITLE: 서버에서 다른 웹 사이트의 데이터를 가져와 응답하기
        http 모듈로 웹 클라이언트 만들기 - GET 방식으로 요청하기
AUTHOR: Assu
DATE: 2017.05.24
*******************************/
var http = require('http');

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/'
};

// get() 메소드의 첫번째 파라미터는 다른 사이트의 정보를 담고 있는 객체
var req = http.get(options, function(res) {
    // 응답 처리
    var resData = '';
    res.on('data', function(chunk) {
        resData += chunk;
    });
    
    res.on('end', function() {
        console.log(resData);
    });
});

req.on('error', function(err) {
    console.log('에러~: ', err.message);
});