/*******************************
TITLE: echo 에러 테스트 RPC 함수

AUTHOR: Assu
DATE: 2017.10.14
*******************************/

// echo 함수
// params : 배열
var echo_error = function(params, callback) {
    console.log('JSON-RPC echo_error 호출됨.');
	console.dir(params);
	
    // 파라미터 체크
    if (params.length < 2) {    // 파라미터 부족
        callback({
            code: 400,
            message: '파라미터 부족함.'
        }, null);
    }
    
    // 첫 번째 파라미터는 오류 전달을 위해 사용
    // 두 번째 파라미터는 정상적인 데이터를 전달할 때 사용
    var output = 'success';
	callback(null, output);
};

module.exports = echo_error;