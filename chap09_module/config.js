/*******************************
TITLE: 설정 파일
        서버 실행 시 필요한 포트 정보와 대이터베이스 연결에 필요한 데이터베이스 URL 정보
        
AUTHOR: Assu
DATE: 2017.09.21
*******************************/

module.exports = {
    server_port: 3000,
    db_url : 'mongodb://localhost:27017/local',
    db_schemas: [
        {file:'./user_schema', collection:'user5', schemaName:'UserSchema', modelName:'UserModel'}
    ],
    route_info: [
    ]        
};
