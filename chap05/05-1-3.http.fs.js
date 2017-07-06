/*******************************
TITLE: http 모듈로 웹서버 만들기 - 이미지 파일 읽어 응답으로 전송
AUTHOR: Assu
DATE: 2017.05.10
*******************************/
var http = require('http');
var fs = require('fs');

// 웹서버 객체 생성
var server = http.createServer();

// 웹 서버를 시작하여 3000번 포트에서 대기하도록 함.
var port = 3000;
server.listen(port, function() {
   console.log('웹서버 시작.', port); 
});

// 클라이언트 요청 이벤트 처리
server.on('request', function(req, res) {
    console.log('클라이언트 요청 들어옴.');
    
    var filename = './chap05/house.png';
    fs.readFile(filename, function(err, data) {
       res.writeHead(200, {"Content-Type": "image/png"});
        res.write(data);
        res.end();
    });
});

// 서버 종료 이벤트 처리
server.on('close', function() {
    console.log('서버 종료');
});