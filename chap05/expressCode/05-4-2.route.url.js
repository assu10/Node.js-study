/*******************************
TITLE: Router 객체를 이용해 라우팅 함수 등록하기
       POST로 요청할 때 URL 파라미터를 params 객체로 확인
    (1) 웹 브라우저에서 http://localhost:3000/05-4-2.login.html 페이지 열고 요청
AUTHOR: Assu
DATE: 2017.07.05
*******************************/
// Express 기본 모듈
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 호출
var bodyParser = require('body-parser')
  , static = require('serve-static');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
// body-parser : POST 요청데이터 추출하는 미들웨어
// 이게 없으면 req.body.id 는 undefined(오류) => POST 방식 오류
app.use(bodyParser.urlencoded({extended: false}));

// body-parser를 이용해 application/json 파싱
//app.use(bodyParser.json());

// 현재 디렉토리/public을 루트경로로 변경
// 이게 없으면 http://localhost:3000/05-4-2.login.html 이 주소로 호출 못함.
app.use(static(path.join(__dirname, 'public')));

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

router.route('/process/login/:name').post(function(req, res) {
    console.log('/process/login/:name 처리함.');
    
    var paramName = req.params.name;
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
	res.write("<br><br><a href='/05-4-2.login.html'>로그인 페이지로 돌아가기</a>");
    res.end();
});

// 라우터 객체를 app 객체에 등록
// 만약에 app.use('/a', router); 이면 router는 /a/process/login 경로에 페이지 생성
app.use('/a', router);

// 등록되지 않은 패스에 대해 페이지 오류 응답
app.all('*', function(req, res) {
    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});