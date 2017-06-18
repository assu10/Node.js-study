var http = require('http');

var opts = {
    host: 'www.google.com',
    port: 80,
    method: 'POST', //POST 사용 
    path: '/',
    headers: {}    
};

var resData = '';
//POST 방식으로 요청할 경우, request() 메서드를 사용함. 
var req = http.request(opts, function(res){
    //응답처리 
    res.on('data',function(chunk){
        resData += chunk;
    });
    
    res.on('end', function(){
        console.log(resData);
    });
});


//request() 메서드로 요청을 보내려면 요청 헤더와 본문을 모두 직접 설정해야 함
opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
req.data = "q=actor";
opts.headers['Content-Length'] = req.data.length;



req.on('error', function(err){
    console.log("오류발생 : " + err.message);
});

//요청 전송
req.write(req.data);
req.end();


//REST api client로 테스트 해본 결과 : chrome-extension://aejoelaoggembcahagimdiliamlcdmfm/restlet_client.html