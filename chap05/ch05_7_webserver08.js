var http = require('http');

//서버에서 다른 웹사이트의 데이터를 가져와 응답하기
//http 모듈을 사용해 get방식으로 다른 사이트에 데이터를 요청하는 코드 
var options = {
    host: 'www.google.com',
    port: 80,
    path: '/'
};

var req = http.get(options, function(res) {
    // 응답 처리
    var resData = '';
    res.on('data', function(chunk) { //data 이벤트 : 데이터를 받고 있는 상태에서 발생 
    	resData += chunk;
    });
    
    res.on('end', function() {
	    console.log(resData);
	});
});

req.on('error', function(err) {
    console.log("에러 발생 : " + err.message);
});

