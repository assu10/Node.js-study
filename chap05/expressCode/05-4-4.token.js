/*******************************
TITLE: URL 파라미터를 params 객체로 확인하기 (토큰)
AUTHOR: Assu
DATE: 2017.07.09
*******************************/
// Express 기본 모듈 호출
var express = require('express')
   , http = require('http');
//   , path = require('path');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// 라우터 사용해서 라우팅 함수 등록
var router = express.Router();
router.route('/process/users/:id').get(function(req, res) {
    console.log('/process/users/:id 처리함.');
    
    // URL 파라미터 확인
    var paramId = req.params.id;
    
    console.log('/process/users와 토큰 %s를 이용해 처리함.', paramId);

	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.end();
});

app.use('/', router);

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});