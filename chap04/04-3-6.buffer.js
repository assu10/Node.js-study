/*******************************
TITLE: fs 사용하기 : Buffer 객체
AUTHOR: Assu
DATE: 2017.05.05
*******************************/

// 버퍼 객체를 크기만 지정하여 만든 후 문자열 쓰기
var output = '안녕 1!';
var buffer1 = new Buffer(10);
var len = buffer1.write(output, 'utf8');
console.log('첫번째 버퍼의 문자열: ', buffer1.toString());

// 버퍼 객체를 문자열을 이용해 만듬
var buffer2 = new Buffer('안녕 2!', 'utf8');
console.log('두번째 버퍼의 문자열: ', buffer2.toString());

// 타입 확인
console.log('버퍼 객체의 타입: ', Buffer.isBuffer(buffer1));

// 버퍼 객체에 들어있는 문자열 데이터를 문자열 변수로 만듦.
var bytelen = Buffer.byteLength(output);
var str1 = buffer1.toString('utf8', 0, bytelen);
var str2 = buffer2.toString('utf8');

// 두 번째 버퍼 객체의 문자열을 첫번째 버퍼 객체로 복사
buffer1.copy(buffer2, 0, 0, len);
console.log('두번째 버퍼에 복사한 후의 첫번째 버퍼 문자열: ', buffer1.toString('utf8'));   // 안녕 1!
console.log('두번째 버퍼에 복사한 후의 두번째 버퍼 문자열: ', buffer2.toString('utf8'));   // 안녕 1!

// 두 개의 버퍼 붙여조기
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('두 개의 버퍼 붙인 후의 문자열: ', buffer3.toString('utf8'));      // 안녕 1!안녕 1!