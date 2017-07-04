/**
* test3.html
*/

// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser')
    , static = require('serve-static');

var cookieParser = require('cookie-parser');

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

// *** Get 으로 쿠키 보여주는 showCookie 라우팅 설정
router.route('/process/showCookie').get(function(req,res){
   console.log('process showCookie 처리함');

    res.send(req.cookies);
});

// *** Get 으로 쿠키 굽는 함수인 setUserCookie에 대한 라우팅 설정
router.route('/process/setUserCookie').get(function(req,res){
   console.log('process setUserCookie 처리함');

    //쿠키 생성
    res.cookie('user', {
       id: '태연',
       name: '소녀시대',
       authorized: true
    });

    res.redirect('/process/showCookie');
});

app.use('/', router); // <- 라우터 등록과정인데 없으면 라우팅 안됨


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


//Error redirection
app.all('*', function(req, res){
    res.status(404).send('<h1> 페이지 없음 </h1>')
})


var exErrHandler = require('express-error-handler');

//404에러 정의
var errHandler = exErrHandler({
    static: {
        '404' : './public/404.html'
    }
});

app.use(exErrHandler.httpError(404));
app.use(errHandler);


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


