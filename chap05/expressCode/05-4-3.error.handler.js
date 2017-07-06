/*******************************
TITLE: express-error-handler 모듈 이용해 에러 처리
AUTHOR: Assu
DATE: 2017.07.05
*******************************/
// Express 기본 모듈 호출
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 호출
var bodyParser = require('body-parser')
  , static = require('serve-static');
///  , errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
// body-parser : POST 요청데이터 추출하는 미들웨어
// 이게 없으면 req.body.id 는 undefined(오류) => POST 방식 오류
app.use(bodyParser.urlencoded({extended: false}));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

// 현재 디렉토리/public을 루트경로로 변경
// 이게 없으면 http://localhost:3000/05-4-2.login.html 이 주소로 호출 못함.
app.use(static(path.join(__dirname, 'public')));

★// 라우터 사용하여 라우팅 함수 등록★