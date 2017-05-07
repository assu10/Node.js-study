/*******************************
TITLE: winson 모듈을 이용해 로그 남기기
AUTHOR: Assu
DATE: 2017.05.05
*******************************/
var winston = require('winston');       // 로그 처리 모듈
var winstonDaily = require('winston-daily-rotate-file');    // 로그 일별 처리 모듈
var moment = require('moment');         // 시간 처리 모듈

function timeStampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ'); // '2016-05-01 20:14:28.500 +0900'
}
