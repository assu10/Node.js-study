var fs = require('fs');
//http 모듈 사용 
var http = require('http');

var server = http.createServer(function(req,res){
    //파일을 읽어 응답 스트림과 pipe로 연결한다.
    var instream = fs.createReadStream('./output.txt');
    instream.pipe(res);
});

server.listen(7001, '127.0.0.1'); // http://localhost:7001/output.txt