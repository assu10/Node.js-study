/**
* test3.html
*/

// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser')
    , static = require('serve-static');

// 익스프레스 객체 생성
var app = express();


app.set('port', process.env.PORT || 3000);


//bodyparser을 이용하여 x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extened : false}));

//bodyparser을 이용하여 json 파싱
app.use(bodyParser.json());

app.use(static(path.join(__dirname, '/public')));

console.log(__dirname);

// 미들웨어에서 헤더와 파라미터 확인

var router = express.Router();

router.route('/process/login/:name').post(function(req,res){
   console.log('process login name 처리함');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.params.name;

	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>paramId : ' + paramId + '</p></div>');
	res.write('<div><p>paramName : ' + paramName + '</p></div>');
	res.write('<div><p>paramPassword : ' + paramPassword + '</p></div>');
	res.end();
});

app.use('/', router); // <- 라우터 등록과정인데 없으면 라우팅 안됨


//Error redirection

/*
app.all('*', function(req, res){
    res.status(404).send('<h1> 페이지 없음 </h1>')
})

var exErrHandler = require('express-error-handler');

//404에러 정의
var errHandler = expressErrorHandler({
    static: {
        '404' : './public/404.html'
    }
});

app.use(exErrHandler.httpError(404));
app.use(errHandler);

*/
/*
app.use(function(req, res, next) {
	console.log('첫번째 미들웨어에서 요청을 처리함.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>paramId : ' + paramId + '</p></div>');
	res.write('<div><p>paramPassword : ' + paramPassword + '</p></div>');
	res.end();
});
*/

// Express 서버 시작
http.createServer(app).listen(3000, function(){
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});


