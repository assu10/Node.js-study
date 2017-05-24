/*******************************
TITLE: 서버에서 다른 웹 사이트의 데이터를 가져와 응답하기
        http 모듈로 웹 클라이언트 만들기 - POST 방식으로 요청하기
AUTHOR: Assu
DATE: 2017.05.24
*******************************/
var http = require('http');

var opts = {
    host: 'www.google.com',
    port: 80,
    method: 'POST',
    path: '/',
    headers: {}
};

var resData = '';
var req = http.request(opts, function(res) {
    // 응답 처리
    res.on('data', function(chunk) {
        resData += chunk;
    });
    
    res.on('end', function() {
        console.log(resData);
    });
});

opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
req.data = "q=actor";
opts.headers['Content-Length'] = req.data.length;

req.on('error', function(err) {
    console.log('에러에러', err.message);
});

// 요청 전송
// http.get()는 자동으로 메서드를 GET으로 설정하고 req.end()를 호출하는데
// http.request()는 req.end() 반드시 호출해줘야함.
req.write(req.data);
req.end();