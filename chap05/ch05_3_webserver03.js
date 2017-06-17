var http = require('http');

//웹 서버 객체를 만듭니다.
var server = http.createServer(); 

//웹 서버를 시작하여 3000번 포트에서 대기합니다.
var port = 3000;
server.listen(port, function() {
    console.log('웹 서버가 시작되었습니다. : %d', port);
});

//클라이언트 연결 이벤트 처리 
server.on('connection', function(socket){ 
    //소켓파라미터의 객체안에 클라이언트 정보가 들어있음. 
    console.log('클라이언트가 접속했습니다. : %s, %d', socket.remoteAddress, socket.remotePort); 
});

//클라이언트 요청 이벤트 처리 
server.on('request', function(req, res){
    console.log('클라이언트 요청이 들어왔습니다.');
    
    /*
     * res객체의 writeHead() / write() / end() 메서드를 사용하면 클라이언트로 응답을 보낼 수있음.
     * writeHead() : 응답으로 보낼 헤더를 만듬.
     * write() : 응답 본문 (body) 데이터를 만듬. 여러번 호출 가능.
     * end() : 클라이언트로 응답을 전송. 파라미터의 데이터도 함께 전송. 클라이언트 요청이 있을때 한번은 호출이 되어야 전송되며 콜백함수 호출 
     *        응답을 모두 보냈단 것을 의미 >> 호출 될 때 클라이언트로 응답을 전송 
     */
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}); 
	res.write("<!DOCTYPE html>");
	res.write("<html>");
	res.write("  <head>");
	res.write("    <title>응답 페이지</title>");
	res.write("  </head>");
	res.write("  <body>");
	res.write("    <h1>노드제이에스로부터의 응답 페이지</h1>");
	res.write("  </body>");
	res.write("</html>");
	res.end();
	  
});

// 서버 종료 이벤트 처리
server.on('close', function() {
	console.log('서버가 종료됩니다.');
});
