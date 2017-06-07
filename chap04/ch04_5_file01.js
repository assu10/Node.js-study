var fs = require('fs');

//파일을 동기식 io로 읽어들입니다.
var data = fs.readFileSync('../package.json', 'utf-8');

//읽은 데이터 출력.
console.log(data);