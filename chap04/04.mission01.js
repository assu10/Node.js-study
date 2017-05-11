/*******************************
TITLE: 파일의 내용을 한 줄씩 읽어들여 화면에 출력
        1) 파일은 각줄에는 공백으로 구분된 이름, 나이, 전화번호
        2) 파일의 내용을 한 줄씩 읽어들이면서 각 정보를 공백으로 구분
        3) 구분된 정보 중에서 이름만 화면에 출력
AUTHOR: Assu
DATE: 2017.05.08
*******************************/
var fs = require('fs');
var readline = require('readline');

// 한 줄씩 읽어들이는 함수 정의
function processFile(filename) {
    var instream = fs.createReadStream(filename);
    var reader = readline.createInterface(instream, process.stdout);
    
    var count = 0;
    
    // 한 줄씩 읽어들인 후에 발생하는 이벤트
    reader.on('line', function(line) {
        console.log('한 줄 읽음: ', line);
        
        count++;
        
        // 공백으로 구분
        var tokens = line.split(' ');
        if (tokens !== undefined && tokens.length > 0) {
            console.log('#' + count + ' -> ' + tokens[0]);
        }
    });
    
    // 모두 읽어들였을 때 발생하는 이벤트
    reader.on('close', function(line) {
        console.log('파일 모두 읽음.');
    });
}

// 함수 실행
var filename = './mission01.txt';
processFile(filename);