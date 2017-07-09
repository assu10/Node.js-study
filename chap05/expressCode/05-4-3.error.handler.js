/*******************************
TITLE: express-error-handler 모듈 이용해 에러 처리
       http://localhost:3000/05 이렇게 아무 주소나 친다.
AUTHOR: Assu
DATE: 2017.07.05
*******************************/
// Express 기본 모듈 호출
var express = require('express')
  , http = require('http');

// Express의 미들웨어 호출
var bodyParser = require('body-parser');

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

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

router.route('/process/login').post(function(req, res) {
    console.log('/process/login 처리함.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
	res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
    res.end();
});

app.use('/', router);

// 등록되지 않은 패스에 대해 페이지 오류 응답
/*app.all('*', function(req, res) {
    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});*/

// 404 에러 페이지 처리 - cmd창에서 실행해야 정상동작함.
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