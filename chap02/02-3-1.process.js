/*******************************
TITLE: process 객체
AUTHOR: Assu
DATE: 2017.04.26
*******************************/
console.log('argv 속성의 파라니터 수 : ' + process.argv.length);
console.dir(process.argv);
console.log('-----------------------------------------');


if (process.argv.length > 2) {
    console.log('세번째 파라미터값 : %s', process.argv[2]);
}

process.argv.forEach(function(item, index) {
    console.log(index + ' : ', item);
});

console.log('-----------------------------------------');


console.dir(process.env);
console.log('os 환경변수의 값 : ', process.env['OS']);