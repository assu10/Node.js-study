var http = require('http');
var fs = require('fs'); //파일 처리용 모듈

// 웹서버 객체를 만듭니다.
var server = http.createServer();

// 웹서버를 시작하여 3000번 포트에서 대기하도록 합니다.
var port = 3000;
server.listen(port, function() {
	console.log('웹서버가 시작되었습니다. : %d', port);
});

// 클라이언트 연결 이벤트 처리
server.on('connection', function(socket) {
	console.log('클라이언트가 접속했습니다. : %s, %d', socket.remoteAddress, socket.remotePort);
});


//클라이언트 요청 이벤트 처리 
server.on('request', function(req, res){
    console.log('클라이언트 요청이 들어왔습니다.');
    
    
    //파일을 스트림으로 읽어 응답 보내기
    var filename = 'house.png';
    //파일을 스트림 객체로 읽어들인 후 pipe()메서드로 응댑 객체와 연결하면 별다른 코드 없이도 파일에 응답을 보낼 수 있다.
    var infile = fs.createReadStream(filename, {flags : 'r'});
    
    //파이프로 연결하여 알아서 처리하도록 설정하기
    infile.pipe(res);
    
    // >> 코드가 간결해지고, 편리한 점이 있지만, 
    // 이 방법을 사용하면 헤더를 설정할 수 없는 등의 제약이 생기므로 필요할 때만 사용.
});


// 서버 종료 이벤트 처리
server.on('close', function() {
	console.log('서버가 종료됩니다.');
});
