/*******************************
TITLE: cookie parser 미들웨어 사용
      웹브라우저에서 아래 주소로 요청
        http://localhost:3000/process/showCookie
        http://localhost:3000/process/setUserCookie
AUTHOR: Assu
DATE: 2017.07.09
*******************************/
// Express 기본 모듈 호출
var express = require('express')
  , http = require('http');

// Express의 미들웨어 호출
var cookieParser = require('cookie-parser');

// 에러핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// 익스프레스 객체 생성
var app = express();

// 기본속성 설정
app.set('port', process.env.PORT || 3000);

// cookie-parser 설정
app.use(cookieParser());

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

router.route('/process/showCookie').get(function(req, res) {
   console.log('/process/showCookie 호출됨.');
    
   res.send(req.cookies);
});

router.route('/process/setUserCookie').get(function(req, res) {
   console.log('/process/setUserCookie 호출됨.');
    
    // 쿠키 설정
    res.cookie('user', {
       id: 'mike',
       name: '소녀시대23',
       auth: true
    });
    
    // redirect로 응답
    res.redirect('/process/showCookie');
});

app.use('/', router);

// 404 에러페이지 처리
var errorHandler = expressErrorHandler({
   static: {
       '404': './public/05-4-3.404.html'
   } 
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
   console.log('Express server listening on port ' + app.get('port')); 
});