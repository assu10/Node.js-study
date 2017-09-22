/*******************************
TITLE: 설정 파일
        서버 실행 시 필요한 포트 정보와 대이터베이스 연결에 필요한 데이터베이스 URL 정보
        
AUTHOR: Assu
DATE: 2017.09.22
*******************************/

module.exports = {
    server_port: 3000,
    db_url : 'mongodb://localhost:27017/local',
    db_schemas: [
        {file:'./user_schema', collection:'user6', schemaName:'UserSchema', modelName:'UserModel'}
    ],
    route_info: [
    ],
    facebook: {		// passport facebook
		clientID: '228106281052535',
		clientSecret: 'a9f391cf79af0363ce647f04a6991938',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	}/*,
	twitter: {		// passport twitter
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/twitter/callback'
	},
	google: {		// passport google
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/google/callback'
	}*/
};
