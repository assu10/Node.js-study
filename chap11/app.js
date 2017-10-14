/*******************************
TITLE: JsonRpc 사용하기

        JSON-RPC를 이용한 서버 모듈 구성
        
        http://www.jsonrpc.org
        https://en.wikipedia.org/wiki/JSON-RPC
        
        
        웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
            http://localhost:3000/public/echo.html
            http://localhost:3000/public/echo_error.html
<<<<<<< HEAD
<<<<<<< HEAD
            http://localhost:3000/public/add.html
            http://localhost:3000/public/listuser.html
            http://localhost:3000/public/echo_encrypted.html
=======
>>>>>>> d99019b... chap11. JSON-RPC 서버 만들기 (1.JSON-RPC를 웹 서버에 적용하기)
=======
            http://localhost:3000/public/add.html
>>>>>>> fe1f370... chap11. JSON-RPC 서버 만들기 (2.계산기 모듈 추가하여 실행하기)
        
AUTHOR: Assu
DATE: 2017.10.14
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



//===== Passport 사용 =====//
var passport = require('passport');
var flash = require('connect-flash');



// 모듈로 분리한 설정 파일 호출
var config = require('./config');

// 모듈로 분리한 데이터베이스 파일 호출
var database = require('./database/database');

// 모듈로 분리한 라우팅 파일 호출
var route_loader = require('./route/route_loader');


// JsonRpc 핸들러 로딩을 위한 파일 불러오기
var handler_loader = require('./handlers/handler_loader');

// JsonRpc 사용을 위한 jayson 모듈 호출
var jayson = require('jayson');


// 익스프레스 객체 생성
var app = express();

//===== 뷰 엔진 설정 =====//
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
console.log('뷰 엔진이 ejs로 설정되었습니다.');


//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));
 
// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));



//===== Passport 사용 설정 =====//

// passport의 세션을 사용할 때는 그 전에 Express의 세션을 사용하는 코드가 있어야 함.
app.use(passport.initialize());     // 패스포트 초기화 시엔 passport.initialize() 미들웨어 필요
app.use(passport.session());        // 로그인 세션 유지시엔 passport.session() 미들웨어 필요
app.use(flash());



// 라우팅 정보를 읽어들여 라우팅 설정
var router = express.Router();
route_loader.init(app, router);

// 패스포트 설정
var configPassport = require('./config/passport');
configPassport(app, passport);

// 패스포트 라우팅 설정
var userPassport = require('./route/user_passport');
userPassport(router, passport);



//===== jayson 미들웨어 사용 =====//

// JSON-RPC 핸들러 정보를 읽어들여 핸들러 설정
// 여기서 지정한 라우팅 패스로 들어오는 요청은 JSON-RPC로 처리
var jsonrpc_api_path = config.jsonrpc_api_path || '/api';
handler_loader.init(jayson, app, jsonrpc_api_path);

console.log('JSON-RPC를 [' + jsonrpc_api_path + '] 패스에서 사용하도록 설정함.');




//===== Passport 관련 라우팅 =====//

// 모듈화 : user_passport.js로 분리



//===== Passport Strategy 설정 =====//

// 모듈화 : local_login.js와 local_signsup.js로 분리
// 모듈화 : passport.js로 분리


// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
 static: {
   '404': './chap06/public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

//===== 서버 시작 =====//

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database.db) {
		database.db.close();
	}
});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

  // 데이터베이스 연결을 위한 함수 호출
  database.init(app, config);
   
});
