/*******************************
TITLE: fs와 web의 응답을 pipe로 연결
AUTHOR: Assu
DATE: 2017.05.05
*******************************/
var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res) {
    // 파일을 읽어 응답 스트림과 pipe()과 연
    var instream = fs.createReadStream('./output.txt');
    instream.pipe(res);
}).listen(7001, function() {
    console.log('Server Running~');
});