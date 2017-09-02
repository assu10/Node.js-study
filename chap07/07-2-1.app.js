/*******************************
TITLE: 모듈화하기

        이전 장(데이터베이스 사용하기)에서 만들었던 웹서버 중 일부 모듈화
        (06-5-2.mongoose.crypto.js)
        
        웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
            http://localhost:3000/public/07-2-1.login.html
            http://localhost:3000/public/07-2-1.adduser.html
        
AUTHOR: Assu
DATE: 2017.09.02
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

// mongoose 모듈 호출
var mongoose = require('mongoose');

// crypto 모듈 호출
var crypto = require('crypto');

// 익스프레스 객체 생성
var app = express();

// 익스프레스 객체 생성
var app = express();

var user = require('./route/07-2-1.user');

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

//===== 데이터베이스 연결 =====//

// 데이터베이스 객체를 위한 변수 선언
var database;

// 데이터베이스 스키마 객체를 위한 변수 선언
//var UserSchema;

// 데이터베이스 모델 객체를 위한 변수 선언
//var UserModel;

// 데이터베이스에 연결
function connectDB() {
    // 데이터베이스 연결 정보
    var databaseUrl = 'mongodb://localhost:27017/local';
    
    // 데이터베이스 연결
    console.log('데이터베이스 연결을 시도합니다');
    mongoose.Promise = global.Promise;      // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'mongoose connection ERROR.'));
    database.on('open', function() {
        console.log('데이터베이스에 연결되었습니다 : ', databaseUrl);
        
        // user 스키마 및 모델 객체 생성
        createUserSchema(database);
    });
    
    // 연결 끊어지면 5초 후 재연결
    database.on('disconnected', function() {
        console.log('연결이 끊어졌습니다. 5초 후 재연결합니다.');
        setInterval(connectDB, 5000);
    });
    
    // 1. app 객체에 database 속성 추가
	app.set('database', database);
}

// user 스키마 및 모델 객체 생성
function createUserSchema(database) {
    // 07-2-1.user.js 에서는 데이터베이스 객체, 스키마 객체, 모델 객체를 전달받아 참조해야 하므로 
    // 메인 파일에서 만들어진 UserSchema와 UserModel 객체는 database 객체의 속성으로 넣어 전달
    
    // 2. user_schema.js 모듈 호출
    database.UserSchema = require('./database/07-2-1.user_schema').createUserSchema(mongoose);
    
    // User 모델 정의
    database.UserModel = mongoose.model('users3', database.UserSchema);
    console.log('UserModel 정의!');
    
    // init() 함수 호출
    user.init(database, UserSchema, UserModel);
}

//===== 라우팅 함수 등록 =====//

// 라우터 객체 참조
var router = express.Router();

// 3. 로그인 처리 함수를 라우팅 모듈을 호출하는 것으로 수정
router.route('/process/login').post(user.login);

// 4. 사용자 추가 함수를 라우팅 모듈을 호출하는 것으로 수정
router.route('/process/adduser').post(user.adduser);

// 5. 사용자 리스트 함수를 라우팅 모듈을 호출하는 것으로 수정
router.route('/process/listuser').post(user.listuser);

// 라우터 객체 등록
app.use('/', router);

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
	if (database) {
		database.close();
	}
});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

  // 데이터베이스 연결을 위한 함수 호출
  connectDB();
   
});
