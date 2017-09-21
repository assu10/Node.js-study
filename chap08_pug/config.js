/*******************************
TITLE: 설정 파일
        서버 실행 시 필요한 포트 정보와 대이터베이스 연결에 필요한 데이터베이스 URL 정보
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

module.exports = {
    server_port: 3000,
    db_url : 'mongodb://localhost:27017/local',
    db_schemas: [
        {file:'./user_schema', collection:'user3', schemaName:'UserSchema', modelName:'UserModel'}
    ],
    route_info: [
        {file:'./user', path:'/process/login', method:'login', type:'post'},
        {file:'./user', path:'/process/adduser', method:'adduser', type:'post'},
        {file:'./user', path:'/process/listuser', method:'listuser', type:'post'},
        {file:'./test', path:'/process/test1', method:'test1', type:'post'}
    ]        
};
