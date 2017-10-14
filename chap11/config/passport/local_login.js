/*******************************
TITLE: 패스포트 설정 파일

        로컬 인증방식을 사용하는 패스포트 설정
        

AUTHOR: Assu
DATE: 2017.09.22
*******************************/

var LocalStrategy = require('passport-local').Strategy;

// 패스포트 로그인 설정
// 패스포트 객체의 use() 메소드를 호출하면서 2개의 파라미터를 전달하는데 
// 첫 번째는 이름이고, 두 번째는 인증 방식을 정의한 객체임.
module.exports = new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true    // 이 옵션을 설정하면 아래 콜백 함수의 첫번째 파라미터로 req 객체 전달됨
}, function(req, email, password, done) {
    console.log('passport의 local-login 호출됨 : ' + email + ', ' + password);
    
    var database = req.app.get('database');
    database.UserModel.findOne({'email':email}, function(err, user) {
        if (err) {
            return done(err);
        }
        
        // 등록된 사용자가 없는 경우
        if (!user) {
            console.log('계정이 일치하지 않음.');
            return done(null, false, req.flash('loginMessage', '등록된 계정 없음'));
        }
        
        // 비번이 맞지 않는 경우
        var authenticated = user.authenticate(password, user._doc.salt, user._doc.assu_hashed_password);
        if (!authenticated) {
            console.log('비번이 틀림');
            return done(null, false, req.flash('loginMessage', '비번 불일치'));
        }
        
        // 정상인 경우
        console.log('계정과 비번 일치함');
        return done(null, user);    // 검증 콜백에서 두 번째 파라미터값을 user객체로 넣어 인증 성공한 것으로 처리
    });
});