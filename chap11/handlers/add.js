/*******************************
TITLE: 계산기 기능 RPC 함수

        
AUTHOR: Assu
DATE: 2017.10.14
*******************************/

// 더하기 함수
var add = function(params, callback) {
    console.log('JSON-RPC add 호출됨.');
	console.dir(params);
    
    // 파라미터 체크
    if (params.length < 2) {
        callback({
            code: 400,
            message: '파라미터 부족함'
        }, null);
        
        return;
    }
    
    var a = params[0];
    var b = params[1];
    var output = a + b;
    
    callback(null, output);
};

module.exports = add;