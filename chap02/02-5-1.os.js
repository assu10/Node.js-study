/*******************************
TITLE: 내장모듈 - os 모듈 사용
AUTHOR: Assu
DATE: 2017.05.02
*******************************/

var os = require('os');

console.log('시스템의 hostname : ', os.hostname());     // JUHYUN10-PC
console.log('시스템의 메모리 : %d / %d', os.freemem(), os.totalmem()); // 3210674176 / 8505491456
console.log('시스템의 CPU 정보\n');
console.dir(os.cpus());
console.log('시스템의 네트워크 인터페이스 정보\n');
console.dir(os.networkInterfaces());