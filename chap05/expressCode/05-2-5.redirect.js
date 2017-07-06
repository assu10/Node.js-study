/*******************************
TITLE: 미들웨어에서 응답할 때 redirect 메소드 사용하기
AUTHOR: Assu
DATE: 2017.06.07
*******************************/

// Express 기본 모듈 호출
var express = require('express')
  , http = require('http');

// 익스프레스 객체 생성
var app = express();

// 미들웨어에서 redirect 메소드 사용
app.use(function(req, res, next) {
    console.log('첫번째 미들웨어에서 요청을 처리함.');
    res.redirect('http://google.co.kr');
});

http.createServer(app).listen(3000, function() {
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});