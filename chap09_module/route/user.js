/*******************************
TITLE: 사용자 정보 처리 모듈

    데이터베이스 관련 객체들을 req.app.get('database')로 참조
    
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

var login = function(req, res) {
 console.log('login 호출됨.');

	// 요청 파라미터 확인
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    // 데이터베이스 객체 참조
    var database = req.app.get('database');
    
    // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
	if (database.db) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			// 에러 발생 시, 클라이언트로 에러 전송
			if (err) {
                console.error('사용자 로그인 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 로그인 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
            // 조회된 레코드가 있으면 성공 응답 전송
			if (docs) {
				console.dir(docs);

                // 조회 결과에서 사용자 이름 확인
				var username = docs[0].name;
				
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                
                // 뷰 템플릿을 이용한여 렌더링한 후 전송
                var context=  {userid:paramId, username:username};
                req.app.render('login_success', context, function(err, html) {
                    if (err) {
                        console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                        
                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				        res.write('<h2>뷰 렌더링 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
				        res.end();
                
                        return;
                    }
                    console.log('rendered : ', html);
                    
                    res.end(html);
                });
                
			} else {  // 조회된 레코드가 없는 경우 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
};


var adduser = function(req, res) {
    console.log('adduser 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);
    
    // 데이터베이스 객체 참조
    var database = req.app.get('database');
    
    // 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
	if (database.db) {
		addUser(database, paramId, paramPassword, paramName, function(err, addedUser) {
            // 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
			if (err) {
                console.error('사용자 추가 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
            // 결과 객체 있으면 성공 응답 전송
			if (addedUser) {
				console.dir(addedUser);
 
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                
                // 뷰 템플릿을 이용한여 렌더링한 후 전송
                var context = {title:'사용자 추가 성공'};
                req.app.render('adduser', context, function(err, html) {
                    if (err) {
                        console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);

                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>뷰 렌더링 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();

                        return;
                    }
                
				    console.log("rendered : " + html);
					
				    res.end(html);
                });
			} else {  // 결과 객체가 없으면 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가  실패</h2>');
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
};


var listuser = function(req, res) {
    console.log('listuser 호출됨.');

    // 데이터베이스 객체 참조
	var database = req.app.get('database');
    
    // 데이터베이스 객체가 초기화된 경우, 모델 객체의 findAll 메소드 호출
	if (database.db) {
		// 1. 모든 사용자 검색
		database.UserModel.findAll(function(err, results) {
			// 에러 발생 시, 클라이언트로 에러 전송
			if (err) {
                console.error('사용자 리스트 조회 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 리스트 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			  
			if (results) {  // 결과 객체 있으면 리스트 전송
				console.dir(results);
 
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				
				// 뷰 템플레이트를 이용하여 렌더링한 후 전송
				var context = {results:results};
				req.app.render('listuser', context, function(err, html) {
				    if (err) {
                        console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                
                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				        res.write('<h2>뷰 렌더링 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
				        res.end();
                
                        return;
                    }
					console.log('rendered : ' + html);
					
					res.end(html);
				});
                
			} else {  // 결과 객체가 없으면 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 리스트 조회  실패</h2>');
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
};


// 사용자를 인증하는 함수 : 아이디로 먼저 찾고 비밀번호를 그 다음에 비교하도록 함
var authUser = function(database, id, password, callback) {
    console.log('authUser 호출됨 : ' + id + ', ' + password);
    
    // 1. 아이디를 이용해 검색
    database.UserModel.findById(id, function(err, results) {
        if (err) {
            callback(err, null);
            return;
        }
        
        console.log('아이디 [%s]로 사용자 검색결과', id);
		console.dir(results);
        
        if (results.length > 0) {
            console.log('아이디와 일치하는 사용자 찾음.');
            
            // 2. 패스워드 확인 : 모델 인스턴스 객체를 만들고 authenticate() 메소드 호출
            var user = new database.UserModel({id:id});
            var authenticated = user.authenticate(password, results[0].salt, results[0].assu_hashed_password);
            
            if (authenticated) {
                console.log('비번 일치함');
                callback(null, results);
            } else {
                console.log('비번 일치하지 않음');
                callback(null, null);
            }
        } else {
            console.log("아이디와 일치하는 사용자를 찾지 못함.");
	    	callback(null, null);
        }
    });
};

// 사용자를 추가하는 함수
var addUser = function(database, id, password, name, callback) {
    console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);
    
    // UserModel 인스턴스 생성
    var user = new database.UserModel({id:id, password:password, name:name});
    
    // save()로 저장 : 저장 성공 시 addeduser 객체가 파라미터로 전달됨
    user.save(function(err, addedUser) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log("사용자 데이터 추가함.");
	    callback(null, addedUser);
    });
};

module.exports.login = login;
module.exports.adduser = adduser;
module.exports.listuser = listuser;
