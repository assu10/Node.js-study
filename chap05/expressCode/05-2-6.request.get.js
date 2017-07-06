/*******************************
TITLE: 미들웨어에서 요청 객체에 있는 헤더와 파라미터 확인하기
        http://localhost:3000?name=mike
AUTHOR: Assu
DATE: 2017.06.08
*******************************/
// Express 기본 모듈 호출
var express = require('express')
  , http = require('http');

// 익스프레스 객체 생성
var app = express();

// 미들웨어에서 헤더와 파라미터 확인 (GET인 경우, POST는 req.body)
app.use(function(req, res, next) {
    console.log('첫번째 미들웨어에서 요청 처리함.');
    
    var userAgent = req.header('User-Agent');
    var paramName = req.query.name;
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과</h1>');
    res.write('<p>User-Agent : '+userAgent+'</p>');
    res.write('<p>Param name : '+paramName+'</p>');
    res.end();
});

// Express 서버 시작
http.createServer(app).listen(3000, function() {
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});