/*******************************
TITLE: 두 개의 미들웨어를 만들어 첫번째에서 두번째로 넘기기
AUTHOR: Assu
DATE: 2017.06.01
*******************************/

// Express 기본 모듈 호출
var express = require('express')
  , http = require('http');

// 익스프레스 객체 생성
var app = express();

// 첫번째 미들웨어에서 다음 미들웨어로 넘김
app.use(function(req, res, next) {
    console.log('첫번째 미들웨어에서 요청 처리함.');
    
    req.user = 'mike';
    
    next();
});

// 두번째 미들웨어에서 응답 전송
