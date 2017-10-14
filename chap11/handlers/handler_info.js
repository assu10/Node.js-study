/*******************************
TITLE: 핸들러 모듈 파일에 대한 정보

        
AUTHOR: Assu
DATE: 2017.10.14
*******************************/

console.log('handler_info 파일 로딩됨.');

// file 속성은 핸들러 모듈 파일의 이름
// method 속성은 등록한 핸들러의 이름
// 핸들러 이름으로 클라이언트가 호출하기 때문에 서버에 핸들러를 등록할 때는 어떤 이름으로 등록되었는지 클라이언트가 알고 있어야 함.

var handler_info = [
	{file:'./echo', method:'echo'}					// echo  
	,{file:'./echo_error', method:'echo_error'}		// echo_error       
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bb88392... chap11. JSON-RPC 서버 만들기 (4.데이터 부분을 암호화하기)
	,{file:'./add', method:'add'}					// 더하기
	//,{file:'./multiply', method:'multiply'}			// 곱하기
	,{file:'./listuser', method:'listuser'}			// 사용자 리스트
	,{file:'./echo_encrypted', method:'echo_encrypted'}			// 암호화된 echo
<<<<<<< HEAD
=======
	/*,{file:'./add', method:'add'}					// 더하기
	,{file:'./multiply', method:'multiply'}			// 곱하기
=======
	,{file:'./add', method:'add'}					// 더하기
<<<<<<< HEAD
	/*,{file:'./multiply', method:'multiply'}			// 곱하기
>>>>>>> fe1f370... chap11. JSON-RPC 서버 만들기 (2.계산기 모듈 추가하여 실행하기)
	,{file:'./listuser', method:'listuser'}			// 사용자 리스트
	,{file:'./echo_encrypted', method:'echo_encrypted'}			// 암호화된 echo*/
>>>>>>> d99019b... chap11. JSON-RPC 서버 만들기 (1.JSON-RPC를 웹 서버에 적용하기)
=======
	//,{file:'./multiply', method:'multiply'}			// 곱하기
	,{file:'./listuser', method:'listuser'}			// 사용자 리스트
	/*,{file:'./echo_encrypted', method:'echo_encrypted'}			// 암호화된 echo*/
>>>>>>> d145bfd... chap11. JSON-RPC 서버 만들기 (3.데이터베이스에서 사용자 리스트 조회하기)
=======
>>>>>>> bb88392... chap11. JSON-RPC 서버 만들기 (4.데이터 부분을 암호화하기)
];

module.exports = handler_info;