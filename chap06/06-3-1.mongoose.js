/*******************************
TITLE: 몽구스로 데이터베이스 다루기
       사용자 조회, 사용자 추가
       
        웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
            http://localhost:3000/public/06-2-1.login.html
            http://localhost:3000/public/06-2-2.adduser.html
AUTHOR: Assu
DATE: 2017.07.23
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

// mongoose 모듈 사용
var mongoose = require('mongoose');

// 익스프레스 객체 생성
var app = express();

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
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));


//===== 데이터베이스 연결 =====//

// 데이터베이스 객체를 위한 변수 선언
var database;

// 데이터베이스 스키마 객체를 위한 변수 선언
var UserSchema;

// 데이터베이스 모델 객체를 위한 변수 선언
var UserModel;

// 데이터베이스 연결
function connectDB() {
    // 데이터베이스 연결 정보
    var databaseUrl = 'mongodb://localhost:27017/local';
    
    // 데이터베이스연결
    console.log('데이터베이스 연결을 시도합니다.');
    
    // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    // 데이터베이스에 연결되었는지 여부는 mongoose 객체에 들어있는 connection 객체로 전달되는 이벤트를 통해 확인
    database.on('error', console.error.bind(console, 'mongoose connection 오류.'));
    database.on('open', function() {
       console.log('데이터베이스에 연결됨:', databaseUrl) ;
        
        // 스키마 정의
        UserSchema = mongoose.Schema({
            id: String,
            name: String,
            pasword: String
        });
        console.log('UserSchema 정의함');
        
        // UserModel 모델 정의
        // users는 이제 구조체가 되고, new를 이용해서 생성 가능하게 됨.
        UserModel = mongoose.model('users', UserSchema);
        console.log('UserModel 정의함');
    });
    
    // 연결 끊어졌을 때 5초 후 재연결
    database.on('disconnected', function() {
        console.log('연결이 끊어졌습니다. 5초 후 재연결합니다.');
        setInterval(connectDB, 5000);
    });
}

//===== 사용자를 인증하는 함수 =====//

var authUser = function(database, id, password, callback) {
    console.log('authUser 호출됨');
    
    // 아이디와 비밀번호를 이용해 검색
    UserModel.find({'id':id, 'password':password}, function(err, results) {
        if (err) {
            callback(err,null);
            return;
        }
        
        console.log('아이디 [%s], 패스워드 [%s]로 사용자 검색결과', id, password);
		console.dir(results);
        
        if (results.length > 0) {
            console.log('사용자 찾음');
            callback(null, results);
        } else {
            console.log("일치하는 사용자를 찾지 못함.");
	    	callback(null, null);
        }
    });
};


//===== 사용자를 추가하는 함수 =====//

var addUser = function(database, id, password, name, callback) {
    console.log('addUser 호출됨');
    
    // UserModel 인스턴스 생성
    var user = new UserModel({'id':id, 'password':password, 'name':name});
    
    // save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
    user.save(function(err, addedUser) {
        if (err) {
            callback(err, null);
            return;
        }
        
        console.log('사용자 데이터 추가함');
        callback(null, addedUser);
    });
};


//===== 라우팅 함수 등록 =====//

// 라우터 객체 참조
var router = express.Router();

// 로그인 라우팅 함수
router.route('/process/login').post(function(req, res) {
    console.log('/process/login 호출됨') ;
    
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    
    // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
    if (database) {
        authUser(database, paramId, paramPassword, function(err, docs) {
            if (err) { throw err; }
            
            if (docs) {
                console.log('사용자 인증 성공', docs);
                
                var username = docs[0].name;
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 성공</h1>');
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				res.write("<br><br><a href='/public/06-2-1.login.html'>다시 로그인하기</a>");
				res.end();
            } else {
                // 조회된 레코드가 없으면 실패 응답 전송
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/06-2-1.login.html'>다시 로그인하기</a>");
				res.end();
            }
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
    }
});


// 사용자 추가 라우팅 함수
router.route('/process/adduser').post(function(req, res) {
    console.log('/process/adduser 호출됨');
    
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;
    
    if (database) {
        addUser(database, paramId, paramPassword, paramName, function(err, addedUser) {
            if (err) { throw err; }
            
            if (addedUser) {
                console.log('사용자 추가 성공', addedUser);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 성공</h2>');
				res.end();
			} else {  // 결과 객체가 없으면 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가  실패</h2>');
				res.end();
			}
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
    }
});

// 라우터 객체 등록
app.use('/', router);


//===== 404 에러 페이지 =====//

var errorHandler = expressErrorHandler({
    static: {
        '404': './chap06/public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


//===== Express 서버 시작 =====//

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function() {
    console.log('프로세스가 종료됩니다.');
    app.close();
});

app.on('close', function() {
    console.log('Express 서버 객체가 종료됩니다.');
    if (database) {
        database.close();
    }
});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
    console.log('서버가 시작됨.');
    
    connectDB();
});