/*******************************
TITLE: 외부 모듈인 nconf 이용해 환경변수 확인
AUTHOR: Assu
DATE: 2017.04.28
*******************************/
var nconf = require('nconf');
nconf.env();
console.log('OS 환경변수의 값 : ', nconf.get('OS'));
console.log('os 환경변수의 값 : ', process.env['OS']);