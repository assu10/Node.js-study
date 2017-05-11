/*******************************
TITLE: http 모듈로 웹 서버 만들기
AUTHOR: Assu
DATE: 2017.05.10
*******************************/
var http = require('http');

// 웹 서버 객체 생성
var server = http.createServer();

// 웹 서버를 시작하여 3000번 포트에서 대기하도록 함.
var port = 3000;
server.listen(port, function() {
   console.log('웹 서버 시작됨 :', port); 
});

// 웹 서버를 시작하여 내 아이피와 3000번 포트에서 대기하도록 함.
//var host = '111.22.33.44';
//var port = 3000;
//server.listen(port, host, '50000', function() {
//    console.log('웹 서버 시작~ %s %d', host, port);
//});