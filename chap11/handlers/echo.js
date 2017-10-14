/*******************************
TITLE: echo RPC 함수

        클라이언트에서 보낸 데이터를 그대로 클라이언트로 다시 보내주는 단순한 기능을 하는 함수

        
AUTHOR: Assu
DATE: 2017.10.14
*******************************/

// echo 함수
// params : 배열
var echo = function(params, callback) {
    console.log('JSON-RPC echo 호출됨.');
	console.dir(params);
	
    // 첫 번째 파라미터는 오류 전달을 위해 사용
    // 두 번째 파라미터는 정상적인 데이터를 전달할 때 사용
	callback(null, params);
};

module.exports = echo;