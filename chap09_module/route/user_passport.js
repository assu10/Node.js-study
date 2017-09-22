/*******************************
TITLE: 패스포트 라우팅 함수 정의

AUTHOR: Assu
DATE: 2017.09.22
*******************************/

module.exports = function(router, passport) {
    // 홈 화면 - index.ejs 템플릿을 이용해 홈 화면이 보이도록 함
    router.route('/').get(function(req, res) {
        console.log('/ 패스 요청됨.');

        // 단순히 views 폴더안에 있는 index.ejs 뷰 템플릿으로 응답 웹문서를 만든 후 응답을 보내주는 역할
        res.render('index.ejs');    
    });

    // 로그인 화면 - login.ejs 템플릿을 이용해 로그인 화면이 보이도록 함.
    router.route('/login').get(function(req, res) {
        console.log('/login 패스 요청됨.');

        // connect-flash 모듈을 사용해 전달받은 메시지를 message 속성으로 전달함.
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    // 사용자 인증 - POST로 요청받으면 패스포트를 이용해 인증함.
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true     // 패스포트로 인증하는 과정에서 오류 발생 시 플래시 메시지로 오류 전달, 즉 코드에서 명시적으로 req.flash() 메소드를 호출하는게 아니라 패스포트 모듈이 자동으로 flash() 메소드를 호출하면서 오류 메시지 설정.
    }));

    // 회원가입 화면 - signup.ejs 템플릿을 이용해 회원가입 화면이 보이도록 함.
    router.route('/signup').get(function(req, res) {
        console.log('/signup 패스 요청됨.');
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    // 회원가입 - POST로 요청받으면 패스포트를 이용해 회원가입 유도함
    router.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    // 프로필 화면 - 로그인 여부를 확인할 수 있도록 먼저 isLoggedIn 미들웨어 실행
    router.route('/profile').get(function(req, res) {
        console.log('/profile 패스 요청됨.');

        // 인증된 경우 req.user 객체에 사용자 정보가 있으며, 
        // 인증이 안된 경우 req.user는 false 임.
        // req.isAuthenticated()로도 인증 확인 가능함.
        console.log('req.user 객체의 값 : ', req.user);

        // 인증이 안된 경우
        if (!req.user) {
            console.log('사용자 인증이 안된 상태임.');
            res.redirect('/');
            return;
        }

        // 인증이 된 경우
        console.log('사용자 인증된 상태임.');
        if (Array.isArray(req.user)) {
            res.render('profile.ejs', {user: req.user[0]._doc});
        } else {
            res.render('profile.ejs', {user: req.user});
        }
    });

    // 로그아웃
    router.route('/logout').get(function(req, res) {
        console.log('/logout 패스 요청됨.');

        req.logout();
        res.redirect('/');
    });
    
    /*// 패스포트 - 페이스북 인증 라우팅 
    router.route('/auth/facebook').get(passport.authenticate('facebook', { 
        scope : 'email' 
    }));

    // 패스포트 - 페이스북 인증 콜백 라우팅
    router.route('/auth/facebook/callback').get(passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));*/
};