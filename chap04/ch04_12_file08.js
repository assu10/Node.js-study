var fs = require('fs'); //파일접근 모듈

var inname = './output.txt';
var outname = './output2.txt';

fs.exists(outname, function(exists){
    if(exists) {
        fs.unlink(outname, function(err){ //이전 파일인 output2.txt 를 삭제 
            if(err) throw err;
            console.log('기존파일 ['+outname+'] 삭제함');
        
        });
    }
    var infile = fs.createReadStream(inname, {flags : 'r'});
    var outfile = fs.createWriteStream(outname, {flags : 'w'});
    
    infile.pipe(outfile);
    console.log('파일 복사 ['+inname+'] -> ['+outname+']')
});