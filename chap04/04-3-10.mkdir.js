/*******************************
TITLE: 새로운 디렉토리 만들었다가 삭제
AUTHOR: Assu
DATE: 2017.05.05
*******************************/
var fs = require('fs');
fs.mkdir('./docs', 0666, function(err) {
    if (err) {
        throw err;
    }
    console.log('새로운 docs 폴더 생성');
    
    fs.rmdir('./docs', function(err) {
       if (err) {
           throw err;
       } 
       console.log('docs 폴더 삭제');
    });
});