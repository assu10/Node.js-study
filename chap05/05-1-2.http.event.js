/*******************************
TITLE: 클라이언트가 웹서버로 요청할 때 이벤트 처리 + 클라이언트 요청받았을 때 응답 보내기
AUTHOR: Assu
DATE: 2017.05.10
*******************************/
var http = require('http');

// 웹서버 객체 생성
var server = http.createServer();

// 웹서버 시작하여 3000번 포트에서 대기하도록 함.
var port = 3000;
server.listen(port, function() {
    console.log('웹서버 시작 :', port);
});

// 클라이언트 연결 이벤트 처리
server.on('connection', function(socket) {
   console.log('클라이언트 접속. : %s, %d', socket.remoteAddress, socket.remotePort); 
});

// 클라이언트 요청 이벤트 처리
server.on('request', function(req, res) {
   console.log('클라이언트 요청 들어옴.'); 
    res.writeHead(200, {"Content-Type":"text/html, charset=utf-8"});        // 응답으로 보낼 헤더 생성
    res.write("<!DOCTYPE html>");                                           // 응답 본문 데이터
	res.write("<html>");
	res.write("  <head>");
	res.write("    <title>res page</title>");
	res.write("  </head>");
	res.write("  <body>");
	res.write("    <h1>res page~</h1>");
	res.write("  </body>");
	res.write("</html>");
    res.end();                                                              // 클라이언트로 응답 전송
});

// 서버 종료 이벤트 처리
server.on('close', function() {
   console.log('서버 종료.'); 
});