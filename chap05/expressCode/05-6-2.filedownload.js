/*******************************
TITLE: 파일 다운로드 하기
        웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
            http://localhost:3000/process/download?filepath=/downloads/111.jpg
        파일다운로드를 위해 클라이언트에서 지정한 이름은 /downloads/111.jpg 입니다.
AUTHOR: Assu
DATE: 2017.07.09
*******************************/
// Express 기본 모듈 호출
var express = require('express')
  , http = require('http')
  , path = require('path');


// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

// 클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
var cors = require('cors');

// mime 모듈
var mime = require('mime');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// 클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
app.use(cors());

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

// 파일 다운로드 패스에 대한 라우팅
router.route('/process/download').get(function(req, res) {
    console.log('/process/download 호출됨');
    
    try {
        var paramFilepath = req.param('filepath');
        var filepath = __dirname + paramFilepath;
        var filename = path.basename(paramFilepath);
        var mimetype = mime.lookup(paramFilepath);
        
        console.log('파일 패스 : ' + filepath);
		console.log('파일 이름 : ' + filename);
		console.log('MIME 타입 : ' + mimetype);
		
        // 파일 크기 확인
        var stats = fs.statSync(filepath);
        var fileSize = stats.size;
        console.log('파일 크기', fileSize);
        
        // 클라이언트에 응답 전송
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	    res.setHeader('Content-type', mimetype);
	    res.setHeader('Content-Length', fileSize);
        
        var filestream = fs.createReadStream(filepath);
        filestream.pipe(res);
    } catch(err) {
        console.dir(err.stack);
		
		res.writeHead('400', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h3>파일 다운로드 실패</h3>');
		res.end();
    }
});

app.use('/', router);

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});