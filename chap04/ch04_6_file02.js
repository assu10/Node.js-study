var fs = require('fs');

//파일을 동기식 io로 읽어들입니다.
fs.readFile('../package.json', 'utf-8', function(err,data){
    //읽은 데이터 출력.
    console.log(data);
});

console.log('프로젝트 폴더 안의 package.json 파일을 읽도록 요청했습니다.');