/*******************************
TITLE: echo RPC 함수

        클라이언트에서 보낸 데이터를 그대로 클라이언트로 다시 보내주는 단순한 기능을 하는 함수

        
AUTHOR: Assu
DATE: 2017.10.14
*******************************/

// echo 함수
var echo = function(params, callback) {
    console.log('JSON-RPC echo 호출됨.');
	console.dir(params);
	
	callback(null, params);
};

module.exports = echo;