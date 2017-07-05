
/**
 * 4장 Test 15
 * 
 * FS 사용하기 : 파일 쓰기
 */

var fs = require('fs');

//파일에 데이터를 씁니다.
fs.readFile('./output.txt', 'utf8', function(err, data) {
	  if(err) {
		  console.log('Error : ' + err);
	  }
	  
	  console.log('output.txt 파일에 데이터 쓰기 완료.');
});
