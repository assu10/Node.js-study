/*******************************
TITLE: 소켓 서버와 소켓 클라이언트 기능을 구성하여 
        소켓 클라이언트에서 데이터를 보내면 소켓 서버에서 다시 돌려주는 기능.
        1) 노드의 소켓 기능을 이용해 소켓 서버와 소켓 클라이언트 생성
        2) 소켓 클라이언트에서는 소켓 서버로 연결
        3) 소켓 클라이언트에서 소켓 서버로 '안녕'같은 글자를 보내면 소켓 서버에서 그 글자를 그대로 다시 클라로 보냄
        4) 클라이언트와 소켓 서버에서는 보내고 받은 데이터를 화면에 출력
AUTHOR: Assu
DATE: 2017.05.08
*******************************/
var net = require('net');

// 소켓 서버 생성
var server = net.createServer(function(socket) {
   // 연결된 클라이언트 정보 확인
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    console.log('클라이언트 연결됨 -> ', socket.name);
    
    // 클라이언트로부터 메시지 받았을 때 발생하는 이벤트
    socket.on('data', function(data) {
        console.log('클라이언트로부터 받은 데이터: ', data.toString());
        
        // 받은 메시지 돌려줌
        socket.write(data + ' from server.');
    });
    
    // 클라이언트 연결이 끊어진 경우
    socket.on('end', function() {
        console.log('클라이언트로부터 연결 끊어짐 -> ', socket.name);
    });
});

// 소켓 서버 실행
var port = 3003;
server.listen(port);

console.log('소켓 서버 실행됨: ', port);