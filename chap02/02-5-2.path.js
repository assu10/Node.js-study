/*******************************
TITLE: 내장모듈 - path 모듈 사용
AUTHOR: Assu
DATE: 2017.05.02
*******************************/

var path = require('path');

// 디렉토리 합치기
var directories = ["user", "mike", "docs"];
var docsDirectory = directories.join(path.sep);     // path.set : \
console.log('문서 디렉토리 : ', docsDirectory);       // user\mike\docs

// 디렉토리명과 파일명 합치기
var curPath = path.join('/users/mike', 'notepad.exe');
console.log('파일 패스 : ', curPath);                   // \users\mike\notepad.exe

// 패스에서 디렉토리, 파일명, 확장자 구분하기
var filename = "C:\\Users\\mike\\notepad.exe";
var dirname = path.dirname(filename);
var basename = path.basename(filename);
var basename2 = path.basename(filename, '.exe');
var extname = path.extname(filename);

// C:\Users\mike, 파일 이름(확장자포함) : notepad.exe, 파일 이름(확장자미포함) : notepad, 확장자 : .exe
console.log('디렉토리 : %s, 파일 이름(확장자포함) : %s, 파일 이름(확장자미포함) : %s, 확장자 : %s', dirname, basename, basename2, extname);