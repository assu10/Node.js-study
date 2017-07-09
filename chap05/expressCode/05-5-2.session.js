/*******************************
TITLE: session 사용하기 (express-session)
        웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
            http://localhost:3000/public/05-5-2.login.html
AUTHOR: Assu
DATE: 2017.07.09
*******************************/
// Express 기본 모듈 호출
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 호출
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 호출
var expressSession = require('express-session');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser 설정
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

// 로그인 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/login').post(function(req, res) {
   console.log('/process/login 호출됨.'); 
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    if (req.session.user) {
        // 이미 로그인된 상태
        console.log('이미 로그인되어 상품페이지로 이동');
        res.redirect('/public/05-5-2.product.html');
    } else {
        // 세션 저장
        req.session.user = {
            id: paramId,
            name: '소녀시대',
            auth: true
        };
        
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h1>로그인 성공</h1>');
		res.write('<div><p>Param id : ' + paramId + '</p></div>');
		res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
		res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
		res.end();
    }
});

// 로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제
router.route('/process/logout').get(function(req, res) {
   console.log('/process/logout 호출됨') ;
    
    if (req.session.user) {
        // 로그인된 상태
        console.log('로그아웃합니다.');
        
        req.session.destroy(function(err) {
           if (err) {
               throw err;
           } 
            
            console.log('세션을 삭제하여 로그아웃 되었습니다.');
            res.redirect('/public/05-5-2.login.html');
        });
    } else {
        // 로그인 안된 상태
        console.log('아직 로그인되어있지 않습니다.');
        res.redirect('/public/05-5-2.login.html');
    }
});

// 상품정보 라우팅 함수
router.route('/process/product').get(function(req, res) {
   console.log('/process/product 호출함');
    
    if (req.session.user) {
        res.redirect('/public/05-5-2.product.html');
    } else {
        res.redirect('/public/05-5-2.login.html');
    }
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