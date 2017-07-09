/*******************************
TITLE: 파일 업로드하기 (multer)
        웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
            http://localhost:3000/public/05-6-1.photo.html
        파일업로드를 위해 클라이언트에서 지정한 이름은 photo 입니다.
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

// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

// 클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
var cors = require('cors');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}));

// public 폴더와 uploads 폴더 오픈
app.use('/public', static(path.join(__dirname, 'public')));
app.use('uploads', static(path.join(__dirname, 'uploads')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// 클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
app.use(cors());

// multer 미들웨어 사용 : 미들웨어 사용 순서 중요 body-parser -> multer -> router
// multer 미들웨어를 사용하려면 multer 미들웨어 함수를 실행하는데, 
// 이때 반환된 객체는 라우팅 함수를 등록할 때 파라미터로 넘겨줌
var storage = multer.diskStorage({
    // 업로드한 파일이 저장될 폴더 지정 (업로드 폴더는 프로젝트 폴더 안에 있어야 함)
    destination: function(req, file, callback) {
        callback(null, 'uploads');
    },
    // 업로드한 파일의 이름 바꿈
    filename: function(req, file, callback) {
        //callback(null, file.originalname + Date.now());
        // path 모듈 이용 (p.78)
        callback(null, path.basename(file.originalname, path.extname(file.originalname)) + '_' + Date.now() + path.extname(file.originalname));
    }
});

// 파일 제한 : 10개, 1M
var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024*1024*1024
    }
});

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

// 파일 업로드 라우팅 함수
// https://github.com/expressjs/multer
// upload.array('photo', 1) - req.files는 photo라는 1개로 구성된 배열
router.route('/process/photo').post(upload.array('photo', 1), function(req, res) {
    console.log('/process/photo 호출됨');
    
    try {
        // 업로드한 파일의 정보 확인
        var files = req.files;
        
        console.log('#===== 업로드된 첫번째 파일 정보 시작 =====#');
        console.dir(req.files[0]);
        console.log('#===== 업로드된 첫번째 파일 정보 끝 =====#');
        
        // 현재의 파일 정보를 저장할 변수 선언
        var originalname = '',
            filename = '',
            mimetype = '',
            size = 0;
        
        if (Array.isArray(files)) { // 배열에 들어가있는 경우(설정에서 1개의 파일도 배열에 넣게 했음)
            console.log('배열에 들어있는 파일 갯수', files.length);
            
            for (var index = 0; index < files.length; index++) {
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;
            }
        } else {    // 배열에 들어가있지 않은 경우 (현재 설정에서는 해당 없음)
            console.log('파일 갯수 :1');
            
            originalname = files[0].originalname;
            filename = files[0].name;
	    	mimetype = files[0].mimetype;
	    	size = files[0].size;
        }
        
        console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);
        
        // 클라이언트에 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h3>파일 업로드 성공</h3>');
		res.write('<hr/>');
		res.write('<p>원본 파일명 : ' + originalname + ' -> 저장 파일명 : ' + filename + '</p>');
		res.write('<p>MIME TYPE : ' + mimetype + '</p>');
		res.write('<p>파일 크기 : ' + size + '</p>');
		res.end();
    } catch(err) {
        console.dir(err.stack);
    }
});

app.use('/', router);

// 404 에러 페이지 처리
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
