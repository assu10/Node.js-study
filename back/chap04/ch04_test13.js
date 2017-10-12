
/**
 * 4장 Test 13
 * 
 * FS와 Web의 응답을 pipe로 연결하기
 */
/*
var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {
	// 파일을 읽어 응답 스트림과 pipe()로 연결합니다.
	var instream = fs.createReadStream('./output.txt');
	instream.pipe(res);
});

server.listen(7001, '127.0.0.1');
*/


//http 모듈 추출
var http = require('http');
//웹 서버 생성
var server = http.createServer();

//웹 서버 실행
//server.listen(52273);
server.listen(52273, function(){
 console.log('Server Start!');
});

//10초후 함수실행->서버종료
setTimeout(function(){
 console.log('Server close!');
 server.close();
}, 5000);
