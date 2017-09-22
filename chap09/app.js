/*******************************
TITLE: 패스포트 사용하기

        패스포트 모듈에서 로그인 인증을 처리하도록 함.
        데이터베이스에 저장된 사용자 정보를 사용해 인증할 수 있도록 LocalStrategy를 인증방식으로 사용함.
        
        http://getbootstrap.com/
        
        웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
            http://localhost:3000/public/login.html
            http://localhost:3000/public/listuser.html
            http://localhost:3000/public/adduser.html
        
AUTHOR: Assu
DATE: 2017.09.21
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



//===== Passport 관련 라우팅 =====//

// 홈 화면 - index.ejs 템플릿을 이용해 홈 화면이 보이도록 함
router.route('/').get(function(req, res) {
    console.log('/ 패스 요청됨.');
    
    // 단순히 views 폴더안에 있는 index.ejs 뷰 템플릿으로 응답 웹문서를 만든 후 응답을 보내주는 역할
    res.render('index.ejs');    
});

// 로그인 화면 - login.ejs 템플릿을 이용해 로그인 화면이 보이도록 함.
router.route('/login').get(function(req, res) {
    console.log('/login 패스 요청됨.');
    
    // connect-flash 모듈을 사용해 전달받은 메시지를 message 속성으로 전달함.
    res.render('login.ejs', {message: req.flash('loginMessage')});
});

// 사용자 인증 - POST로 요청받으면 패스포트를 이용해 인증함.
router.route('/login').post(passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true     // 패스포트로 인증하는 과정에서 오류 발생 시 플래시 메시지로 오류 전달, 즉 코드에서 명시적으로 req.flash() 메소드를 호출하는게 아니라 패스포트 모듈이 자동으로 flash() 메소드를 호출하면서 오류 메시지 설정.
}));

// 회원가입 화면 - signup.ejs 템플릿을 이용해 회원가입 화면이 보이도록 함.
router.route('/signup').get(function(req, res) {
    console.log('/signup 패스 요청됨.');
    res.render('signup.ejs', {message: req.flash('signupMessage')});
});

// 회원가입 - POST로 요청받으면 패스포트를 이용해 회원가입 유도함
router.route('/signup').post(passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
}));

// 프로필 화면 - 로그인 여부를 확인할 수 있도록 먼저 isLoggedIn 미들웨어 실행
router.route('/profile').get(function(req, res) {
    console.log('/profile 패스 요청됨.');
    
    // 인증된 경우 req.user 객체에 사용자 정보가 있으며, 
    // 인증이 안된 경우 req.user는 false 임.
    // req.isAuthenticated()로도 인증 확인 가능함.
    console.log('req.user 객체의 값 : ', req.user);
    
    // 인증이 안된 경우
    if (!req.user) {
        console.log('사용자 인증이 안된 상태임.');
        res.redirect('/');
        return;
    }
    
    // 인증이 된 경우
    console.log('사용자 인증된 상태임.');
    if (Array.isArray(req.user)) {
        res.render('profile.ejs', {user: req.user[0]._doc});
    } else {
        res.render('profile.ejs', {user: req.user});
    }
});

// 로그아웃
router.route('/logout').get(function(req, res) {
    console.log('/logout 패스 요청됨.');
    
    req.logout();
    res.redirect('/');
});

//===== Passport Strategy 설정 =====//

var LocalStrategy = require('passport-local').Strategy;

// 패스포트 로그인 설정
// 패스포트 객체의 use() 메소드를 호출하면서 2개의 파라미터를 전달하는데 
// 첫 번째는 이름이고, 두 번째는 인증 방식을 정의한 객체임.
passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true    // 이 옵션을 설정하면 아래 콜백 함수의 첫번째 파라미터로 req 객체 전달됨
}, function(req, email, password, done) {
    console.log('passport의 local-login 호출됨 : ' + email + ', ' + password);
    
    var database = app.get('database');
    database.UserModel.findOne({'email':email}, function(err, user) {
        if (err) {
            return done(err);
        }
        
        // 등록된 사용자가 없는 경우
        if (!user) {
            console.log('계정이 일치하지 않음.');
            return done(null, false, req.flash('loginMessage', '등록된 계정 없음'));
        }
        
        // 비번이 맞지 않는 경우
        var authenticated = user.authenticate(password, user._doc.salt, user._doc.assu_hashed_password);
        if (!authenticated) {
            console.log('비번이 틀림');
            return done(null, false, req.flash('loginMessage', '비번 불일치'));
        }
        
        // 정상인 경우
        console.log('계정과 비번 일치함');
        return done(null, user);    // 검증 콜백에서 두 번째 파라미터값을 user객체로 넣어 인증 성공한 것으로 처리
    });
}));


// 패스포트 회원가입 설정
passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password', 
    passReqToCallback : true    // 이 옵션을 설정하면 아래 콜백 함수의 첫번째 파라미터로 req 객체 전달됨.
}, function(req, email, password, done) {
    // 요청 파라미터 중 name 파라미터 확인
    var paramName = req.body.name || req.query.name;
    
    console.log('passport의 local-signup 호출됨 : ' + email + ', ' + password + ', ' + paramName);
    
    // findOne 메소드가 blocking 되지 않게 하고 싶은 경우, async 방식으로 변경.
    process.nextTick(function() {
        var database = app.get('database');
        database.UserModel.findOne({'email':email}, function(err, user){
            // 에러 발생 시 
            if (err) {
                return done(err);
            }
            
            // 기존에 사용자 정보가 있는 경우
            if (user) {
                console.log('기존에 계정이 있음.');
                return done(null, false, req.flash('signupMessage', '계정이 이미 있음.'));
            } else {
                // 모델 인스턴스 객체 만들어서 저장
                var user = new database.UserModel({'email':email, 'password':password, 'name':paramName});
                user.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log('사용자 데이터 추가함.');
                    return done(null, user);
                });
            }
        });
    });
}));


// 사용자 인증 성공 시 호출
// 사용자 정보를 이용해 세션을 만듦
// 로그인 이후에 들어오는 요청은 deserializeUser 메소드 안에서 이 세션 확인 가능.
passport.serializeUser(function(user, done) {
    console.log('selializeuser() 호출됨.');
    console.log(user);
    
    // 이 인증 콜백에서 넘겨주는 user 객체의 정보를 이용해 세션 생성
    // 이 user 객체는 다음에 처리할 함수 쪽으로 전달됨.
    done(null, user);
});

// 사용자 인증 이후 사용자 요청 시마다 호출
// user -> 사용자 인증 성공 시 serializeUser 메소드를 이용해 만들었던 세션 정보가 파라미터로 넘어온 것임.
passport.deserializeUser(function(user, done) {
    console.log('selializeuser() 호출됨.');
    console.log(user);
    
    // 사용자 정보 중 id나 email만 있는 경우 사용자 정보 조회 필요 - 여기에서는 user 객체 전체를 패스포트에서 관리
    // 두 번째 파라미터로 지정한 사용자 정보는 req.user 객체로 복원됨
    // 여기에서는 파라미터로 받은 user를 별도로 처리하지 않고 그대로 넘겨줌
    done(null, user);
});

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
