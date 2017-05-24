/*******************************
TITLE: 이미지 파일 읽어 pipe()로 응답 전송
        pipe() 이용 시엔 헤더를 설정할 수 없는 등의 제약이 생기므로 필요할때만 사용할 것.
AUTHOR: Assu
DATE: 2017.05.18
******************************/
var http = require('http');
var fs = require('fs');

// 웹서버 객체 생성
var server = http.createServer();

// 웹서버 시작하여 3000번 포트에서 대기하도록 함.
var port = 3001;
server.listen(port, function() {
    console.log('웹 서버 시작.', port);
});

// 클라이언트 연결 이벤트 처리
server.on('connection', function(socket) {
    console.log('클라이언트 접속함: %s, %d', socket.remoteAddress, socket.remotePort);
});

// 클라이언트 요청 이벤트 처리
server.on('request', function(req, res) {
    console.log('클라이언트 요청 들어옴.');
    
    var filename = './house.png';       // cmd창으로 할 때는 './house.png'으로 하고, 브라켓으로 할 때는 ./chap05/house.png'로 해야 함.
    var infile = fs.createReadStream(filename, {flags:'r'});
    
    // 파이프로 연결하여 알아서 처리되도록 하기 (파일을 스트림객체로 읽어들인 후 응답객체와 연결)
    infile.pipe(res);
});

// 서버 종료 이벤트 처리
server.on('close', function() {
   console.log('서버 종료.'); 
});