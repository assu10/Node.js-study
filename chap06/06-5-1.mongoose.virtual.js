/*******************************
TITLE: 몽구스의 virtual() 사용
        user4 컬렉션의 id, name을 같이 조회하거나 저장하는 virtual 메소드 추가
AUTHOR: Assu
DATE: 2017.07.30
*******************************/

//===== 모듈 불러들이기 =====//
var mongodb = require('mongodb');
var mongoose = require('mongoose');


//===== 데이터베이스 연결 =====// 
var database;       // 데이터베이스 객체 저장
var UserSchema;     // 스키마 객체 저장
var UserModel;      // 모델 객체 저장

// 데이터베이스에 연결하고 응답 객체의 속성으로 db 객체 추가
function connectDB() {
    // 데이터베이스 연결 정보
    var databaseUrl = 'mongodb://localhost:27017/local';
    
    // 데이터베이스 연결
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'mongoose connection ERRER.'));
    
    database.on('open', function() {
        console.log('데이터베이스에 연결되었습니다.', databaseUrl);
        
        // user 스키마 및 모델 객체 생성
        createUserSchema();
        
        // test 진행
        doTest();
    });
}

// user 스키마 및 모델 객체 생성
function createUserSchema() {
    // 스키마 정의
    UserSchema = mongoose.Schema({
        id: {type: String, required: true, unique: true},
        name: {type: String, index: 'hashed', 'default': ''},
        age: {type: Number, 'default': -1},
        created_at: {type: Date, index: {unique: false}, 'default': Date.now},
        updated_at: {type: Date, index: {unique:false}, 'default': Date.now}
    });
    
    // info를 virtual 메소드로 정의
    UserSchema.virtual('info')
              .set(function(info) {
                    var splitted = info.split(' ');
                    this.id = splitted[0];
                    this.name = splitted[1];
                    console.log('virtual info 설정함: %s, %s', this.id, this.name);
                });
              /*.get(function() {
                    return this.id + '88 88' + this.name;
                });*/
    console.log('UserSchema 정의함');
    
    // UserModel 정의
    // user5는 이제 구조체가 되고, new를 이용해서 생성 가능하게 됨.
    UserModel = mongoose.model("user5", UserSchema);
    console.log('UserModel 정의함');
}

// 사용자 데이터 추가하고 조회
// virtual() : 데이터 은닉 시, 혹은 실제 존재하지 않는 속성 (통계컬럼같은 집계 필드), 혹은 성,이름,전체 이름 필요 시 db엔 성,이름만 저장하고 전체이름은 가상필드로
function doTest() {
    // UserModel 인스턴스 생성
    // id, name 속성은 할당하지 않고 info 속성만 할당함
    var user = new UserModel({'info': 'test06 씨스타33'});
    
    // save()로 저장
    user.save(function(err) {
        if (err) { throw err; }
        
        console.log('사용자데이터 추가함');
        
        findAll();
        
        console.log('info 속성에 값 할당함.');
	    console.log('id : %s, name : %s', user.id, user.name);
    });
}

function findAll() {
    UserModel.find({}, function(err, results) {
        if (err) { throw err; }
        console.log('result :',  results);
        if (results) {
            console.log('조회된 user 문서 객체 #0 -> id : %s, name : %s, ', results[2]._doc.id, results[2].name);
        }
    });
}

connectDB();