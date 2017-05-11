/*******************************
TITLE: winson 모듈을 이용해 로그 남기기
AUTHOR: Assu
<<<<<<< HEAD
DATE: 2017.05.05
*******************************/
var winston = require('winston');       // 로그 처리 모듈
var winstonDaily = require('winston-daily-rotate-file');    // 로그 일별 처리 모듈
var moment = require('moment');         // 시간 처리 모듈
=======
DATE: 2017.05.08
*******************************/
var winston = require('winston');                           // 로그 처리 모듈
var winstonDaily = require('winston-daily-rotate-file');    // 로그 일별 처리 모듈
var moment = require('moment');                             // 시간 처리 모듈
>>>>>>> parent of 0efdc40... 내꺼

function timeStampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ'); // '2016-05-01 20:14:28.500 +0900'
}
<<<<<<< HEAD
=======

var logger = new (winston.Logger) ({
    transports: [
        new (winstonDaily) ({
            name: 'info-file',
            filename: './log/server',
            datePattern: '_yyyy-MM-dd.log',
            colorize: false,
            maxsize: 50000000,      // 파일크기가 50MB 넘어가면 자동으로 새로운 파일로 생성
            maxFiles: 1000,         // 이 때 자동으로 분리되어 생성되는 파일의 개수는 최대 1000개까지 가능
            levle: 'info',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        }),
        new (winston.transports.Console)({
            name: 'debug-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        })
    ],
    exceptionHandlers: [
        new (winstonDaily) ({
            name: 'exception-file',
            filename: './log/exception',
            dataPattern: '_yyyy-MM-dd.log',
            colorize: false,
            mzxsize: 50000000,
            maxFiles: 1000,
            level: 'error',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        }),
        new (winston.transports.Console)({
            name: 'exception-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        })
    ]
});

var fs = require('fs');

var inname = './output.txt';
var outname = './output2.txt';

fs.exists(outname, function(exists) {
    if (exists) {
        fs.unlink(outname, function(err) {
           if (err) {
               throw err;
           }
           logger.info('기존 파일 [' + outname +'] 삭제함.');
        });
    }
    
    var infile = fs.createReadStream(inname, {flag: 'r'});
    var outfile = fs.createWriteStream(outname, {flag: 'w'});
    
    infile.pipe(outfile);
    logger.info('파일 복사 [' + inname + '] -> [' + outname + ']');
});
>>>>>>> parent of 0efdc40... 내꺼
