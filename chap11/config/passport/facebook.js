/*******************************
TITLE: 패스포트 기본 설정 파일

        페이스북 인증 방식에 사용되는 패스포트 설정
        

AUTHOR: Assu
DATE: 2017.09.22
*******************************/

var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../../config');

module.exports = function(app, passport) {
	return new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: config.facebook.callbackURL,
        profileFields: ['emails']     
	}, function(accessToken, refreshToken, profile, done) {
		console.log('passport의 facebook 호출됨.');
		console.log('profile : ', profile);
		
		var options = {
		    criteria: { 'facebook.id': profile.id }
		};
		
		var database = app.get('database');
//	    database.UserModel.load(options, function (err, user) {
        // database.UserModel.load is not a function 이런 메시지 나옴. (위에처럼 하면...)
        database.UserModel.findOne(options, function (err, user) {
			if (err) { return done(err); }
      
			if (!user) {
				var user = new database.UserModel({
					name: profile.displayName,
					email: profile.emails[0].value,
					provider: 'facebook',
					authToken: accessToken,
					facebook: profile._json
				});
        
				user.save(function (err) {
					if (err) { console.log(err); }
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
	    });
	});
};