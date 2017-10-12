var http = require('http');

//웹 서버 객체를 만듭니다.
var server = http.createServer(); 

//웹 서버를 시작하여 3000번 포트에서 대기합니다.
var port = 3000;
server.listen(port, function() {
    console.log('웹 서버가 시작되었습니다. : %d', port);
});


/*
 * on() 메서드는 이벤트를 처리할 때 사용하는 가장 기본적인 메서드.
 * 이 메서드로 connection, request, close이켄트를 처리할 수 있는 콜백함수를 등록해 두면 상황에 맞게 자동 호출됨.
 */

//클라이언트 연결 이벤트 처리 
server.on('connection', function(socket){ //첫번째 파라미터로 커넥션을 전달, 두번째로 콜백함수를 전달. 콜백함수는 소켓 객체를 파마리터로 전달.
    var addr = socket.address(); // 소켓 객체는 클라이언트 연결 정보를 담고있으므로 address() 메서드를 이용하여 클라이언트 ip /포트 확인가능.
    console.log('클라이언트가 접속했습니다. : %s , %d', addr.address, addr.port);
});

//클라이언트 요청 이벤트 처리 
server.on('request', function(req, res){
    console.log('클라이언트 요청이 들어왔습니다.');
    console.dir(req); //req 객체에 관한 모든 정보가 출력된다.
});

//서버 종료 이벤트 처리
server.on('close', function(){
    console.log('서버가 종료되었습니다.');
});