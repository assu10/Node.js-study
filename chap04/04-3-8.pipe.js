/*******************************
TITLE: 파이프 사용하기
AUTHOR: Assu
DATE: 2017.05.05
*******************************/
var fs = require('fs');
var inname = './output.txt';
var outname = './output3.txt';

fs.exists(outname, function(exists) {
    if (exists) {
        fs.unlink(outname, function(err) {      // 파일 삭제
            if (err) {
                throw err;
            }
            console.log('기존 파일['+ outname + '] 삭제함.');
        });
    }
    var infile = fs.createReadStream(inname, {flags: 'r'});
    var outfile = fs.createWriteStream(outname, {flags: 'w'});

    // pipe()로 두 개의 스트림 객체 연결
    infile.pipe(outfile);
    console.log('파일 복사 [' + inname + '] -> [' + outname + ']');
});