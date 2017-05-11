/*******************************
TITLE: 파일의 일부 내용 읽기
AUTHOR: Assu
DATE: 2017.05.05
*******************************/
var fs = require('fs');

// 파일에서 데이터 읽음
fs.open('./output.txt', 'r', function(err, fd) {
    if (err) {
        throw err;
    }
    var buf = new Buffer(10);
    console.log('버퍼 타입: ', Buffer.isBuffer(buf));
    
    fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer) {
        if (err) {
            throw err;
        }
        var inStr = buffer.toString('utf8', 0, bytesRead);
        console.log('읽은 데이터: ', inStr);
        console.log(err, bytesRead, buffer);
        
        fs.close(fd, function() {
            console.log('파일 열고 읽기 끝.');
        });
    });
});
