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

var expressSession = require('express-session');
var exErrHandler = require('express-error-handler');

var multer = require('multer');
var fs = require('fs');

var cors = require('cors'); // 클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 지원)를 지원해줌

// 익스프레스 객체 생성
var app = express();


app.set('port', process.env.PORT || 3000);


//bodyparser을 이용하여 x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended : false}));

//bodyparser을 이용하여 json 파싱
app.use(bodyParser.json());
app.use(cookieParser());//미들웨어에 추가
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
//public폴더와 uploads폴더를 쓰겠다고 오픈
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
/*
app.use(static(path.join(__dirname, 'public')));
app.use(static(path.join(__dirname, 'uploads')));
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
*/
console.log(__dirname);

//app.use(cors());

//multer 미들웨어를 사용 : 미들웨어 사용 순서가 중요함 body-parser -> multer -> router
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        //여기서 파일이 저장될 폴더를 지정함
        //callback(null, path.join(__dirname, 'uploads'))
        callback(null, 'uploads');
        //brackets에서 경로를 ch05가 아니라 Node.js-study를 Root로 잡아서 안되는 거였음
        //__dirname으로 정의된 절대경로를 Path로 넣어주니 해결됨
    },
    filename: function(req, file, callback) {
        console.log(file.originalname + Date.now());
        callback(null, file.originalname + Date.now())
    }
})

var upload = multer({storage: storage, limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024
}});


// 미들웨어에서 헤더와 파라미터 확인

var router = express.Router();

router.route('/process/photo').post(upload.array('photo', 2), function(req,res){
   console.log('photo start');

    try{
        var files = req.files;

        console.log(req.files[0]);

        var originName ='', filename ='', mimetype = '', size = 0;

        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        if(Array.isArray(files)){
            console.log('배열에 파일 갯수 : %d', files.length);
            for ( var i = 0; i < files.length; i++){
                originName = files[i].originalname;
                filename = files[i].filename;
                mimetype = files[i].mimetype;
                size = files[i].size;
        res.write('<h1>파일업로드 성공</h1>');
        res.write('<div><p>originName : ' + originName + '</p></div>');
        res.write('<div><p>filename : ' + filename + '</p></div>');
        res.write('<div><p>mimetype : ' + mimetype + '</p></div>');
        res.write('<div><p>size : ' + size + '</p></div>');
        console.log('현재 파일 정보 : ' + originName + ',' + filename + ',' + mimetype + ',' + size);
            }

        } else {
            console.log('파일 갯수 : 1');
            originName = files[i].originalname;
            filename = files[i].filename;
            mimetype = files[i].mimetype;
            size = files[i].size;

        }


        res.end();
    } catch(err) {
        console.dir(err.stack);
    }

});


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

//프로덕트 페이지에서 로그인 체크
router.route('/process/product').get(function(req,res){
   console.log('process product 처리함');

    if(req.session.user){
        res.redirect('/product.html');
    } else {
        res.redirect('/login2.html');
    }
});

//로그인 구현부
router.route('/process/login').post(function(req,res){
   console.log('process login 처리함');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    if(req.session.user){
        if(req.session.user.id == paramId) {
            console.log('이미 로그인된 유저 ' + paramId);
            res.redirect('/product.html');
        } else {
            //추가 구현부 -> id가 현재 세션과 다르면 파기하고 재로그인
            console.log('로그인 중이므로 세션 파기하고 재로그인');
            req.session.destroy(function(err){
                if(err) {throw err;}
                console.log('세션 삭제 후 다시 로그아웃');
                res.redirect('/login2.html');
            });
        }
    } else {
        //세션이 없으므로 생성한다.
        req.session.user = {
           id: paramId,
           name: '소녀시대',
           authorized: true
        }


        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>paramId : ' + paramId + '</p></div>');
        res.write('<div><p>paramPassword : ' + paramPassword + '</p></div>');
        res.write('<br/><br/><a href="/process/product">상품페이지로 이동</a>');
        res.end();
    }
});


//로그아웃 구현부
router.route('/process/logout').get(function(req,res){
   console.log('process logout 처리함');

    if(req.session.user){
        console.log('로그아웃 처리');
        req.session.destroy(function(err){
            if(err) {throw err;}

            console.log('세션 삭제 후 로그아웃');
            res.redirect('/login2.html');
        })
    } else {
        //로그인 안된 상태
        res.redirect('/login2.html');
    }
});


app.use('/', router); // <- 라우터 등록과정인데 없으면 라우팅 안됨


//Error redirection
app.all('*', function(req, res){
    res.status(404).send('<h1> 페이지 없음 </h1>')
})



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


