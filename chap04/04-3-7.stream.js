/*******************************
TITLE: 한 파일을 스트림으로 읽어 다른 파일에 쓰기
AUTHOR: Assu
DATE: 2017.05.05
*******************************/
var fs = require('fs');
var infile = fs.createReadStream('./output.txt', {flag: 'r'});
var outfile = fs.createWriteStream('./output4.txt', {flag: 'w'});

infile.on('data', function(data) {
    console.log('읽어들인 데이터: ', data.toString());
    outfile.write(data);
});

infile.on('end', function(data) {
    console.log('파일 읽기 종료.');
    outfile.end(function() {
        console.log('파일 쓰기 종료.');
    });
});