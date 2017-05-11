/*******************************
TITLE: fs 사용하기 - 비동기식 IO 방식 (write)
AUTHOR: Assu
DATE: 2017.05.05
*******************************/
var fs = require('fs');

// 파일에 데이터 쓰기
fs.writeFile('./output.txt', 'Hello World!', function(err) {
    if (err)  {
        console.log('Error: ', err);    
    }
    console.log('파일 쓰기 완료');
});