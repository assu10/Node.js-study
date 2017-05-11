/*******************************
TITLE: fs 사용하기 - 비동기식 IO 방식 (read)
AUTHOR: Assu
DATE: 2017.05.05
*******************************/
var fs = require('fs');

// 파일을 비동기식 IO 방식으로 읽음
fs.readFile('./package.json', 'utf8', function(err, data) {
    console.log(data);
});

console.log('파일 읽도록 요청함.');