
/**
 * 4장 Test 8
 * 
 * FS 사용하기 : 파일을 열어 데이터를 쓰고 파일 닫기
 */

var fs = require('fs')  ;

//파일에 데이터를 씁니다.
fs.open('./output.txt', 'a+', function(err, fd) {
    if(err) throw err;

    var buf = new Buffer('안녕2222333!\n');
    fs.write(fd, 'sdf', 0, buf.length, null, function(err, written) {
	    if(err) throw err;
	    
	    console.log(err, written, buffer);
	    
	    fs.close(fd, function() {
	      console.log('파일 열고 데이터 쓰고 파일 닫기 완료.');
	    });
	});
});
