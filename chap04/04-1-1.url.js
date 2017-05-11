/*******************************
TITLE: URL 모둘
AUTHOR: Assu
DATE: 2017.05.04
*******************************/
var url = require('url');

// 주소 문자열을 URL 객체로 만들기
var curURL = url.parse('https://m.search.naver.com/search.naver?query=steve+jobs&where=m&sm=mtp_hty');

// URL 객체를 주소 문자열로 만들기
var curStr = url.format(curURL);

console.log('주소 문자열:', curStr);
console.dir(curURL);


// 요청 파라미터 구분하기
var querystring = require('querystring');
var param = querystring.parse(curURL.query);                    // parse() : 요청 파라미터 문자열을 파싱하여 객체로 만들어줌.

console.log('요청 파라미터 중 query의 값: ', param.query);
console.log('요청 파라미터 중 where의 값: ', param.where);
console.log('원본 요청 파라미터: ', querystring.stringify(param));  // stringify() : 객체 안에 들어있는 요청 파라미터는 다시 하나의 문자열로 변환


