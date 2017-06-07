/*******************************
TITLE: console 객체 사용
AUTHOR: Assu
DATE: 2017.04.26
jslint devel: true
*******************************/
console.log('안녕~');
console.log('---------------------------------');

console.log('undefined vs null');
console.log('---------------------------------');
var u;
var n = null;
console.log('u', u);    // undefined
console.log('n', n);    // null


console.log('---------------------------------');
console.log('실행 소요시간 확인');
console.log('---------------------------------');

// 실행 소요시간 확인
var result = 0;
console.time('duration_sum');
for (var i=0; i<=1000; i++) {
    result += i;
}
console.timeEnd('duration_sum');        // duration_sum: 0.054ms
console.log('1~1000까지 합 : %d', result);
console.log('현재 실행한 파일명 %s', __filename);
console.log('현재 실행한 파일경로 %s', __dirname);
console.log('---------------------------------');


// dir() 메소드 사용
var Person = {name:"소녀시대", age:20};
console.log(Person);    // { name: '소녀시대', age: 20 }
console.dir(Person);    // { name: '소녀시대', age: 20 }