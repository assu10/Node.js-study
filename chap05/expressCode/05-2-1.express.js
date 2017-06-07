/*******************************
TITLE: express를 사용한 가장 단순한 샘플
AUTHOR: Assu
DATE: 2017.05.24
*******************************/
// express 기본 모듈 불러오기
var express = require('express')
    , http = require('http');

// express 객체 생성
var app = express();

// 기본 포트를 app 객체에 속성으로 설정
app.set('port', process.env.PORT || 3000);

// express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
   console.log('익스프레스 서버 시작', app.get('port')); 
});