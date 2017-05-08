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

var hostname = '127.0.0.1';
var port = 3003;

// 서버에 연결
var client = new net.Socket();
client.connect(port, hostname, function() {
    console.log('서버에 연결됨 -> ' + hostname + ':' + port);
    client.write('안녕');
});

// 서버로부터 데이터 받았을 때 발생하는 이벤트
client.on('data', function(data) {
    console.log('서버로부터 받은 데이터 -> ', data.toString());
    
    // 클라이언트 연결 종료
    client.destroy();
});

client.on('close', function() {
   console.log('연결 끊어짐'); 
});