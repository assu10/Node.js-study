/*******************************
TITLE: 데이터베이스 스키마를 정의하는 모듈

AUTHOR: Assu
DATE: 2017.09.22
*******************************/

var crypto = require('crypto');


// module.exports에 객체를 할당하는 방식을 사용하기 위해 먼저 Schema 객체 정의
// 그리고 난 후 Schema 객체에 createSchema 속성 추가
var Schema = {};


/* 
스키마를 만드려면 mongoose 모듈 객체를 참조해야함
이 모듈 객체는 app.js 파일에서 불러들인 후 변수에 할당한 것이므로 user_schema.js 파일에서는
이 객체를 파라미터로 전달받아야 사용 가능.

물론 이 user_schema.js 파일 안에서 require() 메소드로 mongoose 모듈을 직접 불러올 수도 있지만,
app.js 파일에서 mongoose 모듈에 설정한 정보를 똑같이 사용하려면 파라미터로 전달받아야 함.

이 때문에 createSchema 함수에 mongoose 객체를 파라미터로 전달받게함.
*/

Schema.createUserSchema = function(mongoose) {
    // 스키마 정의
    // password를 hashed_password로 변경, 각 컬럼에 default 속성 모두 추가, salt 속성 추가
    var UserSchema = mongoose.Schema({
        email: {type: String, required: true, 'default': ''}
        , assu_hashed_password: {type: String, 'default':''}
        , name: {type: String, index: 'hashed', 'default':''}
        , salt: {type: String}
        , created_at: {type: Date, index: {unique: false}, 'default': Date.now}
        , updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
        , provider : {type: String, 'default': ''}      // facebook, twitter처럼 사용자 인증 서비스를 제공하는 서비스 제공자 이름
        , authToken : {type : String, 'default': ''}    // 인증서비스를 제공하는 서버에서 응답받은 access token값
        , facebook : {}     // 응답받은 사용자 정보 객체르르 그대로 저장
    });
    
    // password를 virtual 메소드로 정의: mongoDB에 저장되지 않는 가상 속성임
    // 특정 속성을 지정하고 set, get 메소드를 정의함
    UserSchema
        .virtual('password')
        .set(function(password) {
            this._password = password;
            this.salt = this.makeSalt();
            this.assu_hashed_password = this.encryptPassword(password);
            console.log('virtual password의 set 호출됨 ', this.assu_hashed_password);
        })
        .get(function() {
            console.log('virtual password의 get 호출됨');
            return this._password;
        });
    
    // 스키마에 모델 인스턴스에서 사용할 수 있는 메소드 추가
    // 비밀번호 암호화 메소드
    // method() : 모델의 인스턴스 객체에서 사용할 수 있는 함수 등록
    // static() : 모델 객체에서 사용할 수 있는 함수 등록
    UserSchema.method('encryptPassword', function(plainText, inSalt) {
        if (inSalt) {
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
        } else {
            return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
        }
    });
    
    // salt 값 만들기 메소드
    UserSchema.method('makeSalt', function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    });
    
    // 인증 메소드 - 입력된 비밀번호와 비교 (true/false 리턴)
    UserSchema.method('authenticate', function(plainText, inSalt, assu_hashed_password) {
        if (inSalt) {
            console.log('authenticate 호출됨1 : %s -> %s : %s', plainText, this.encryptPassword(plainText, inSalt), assu_hashed_password);
            
            return this.encryptPassword(plainText, inSalt) === assu_hashed_password;
        } else {
            console.log('authenticate 호출됨2 : %s -> %s : %s', plainText, this.encryptPassword(plainText), this.assu_hashed_password);
            
            return this.encryptPassword(plainText) === this.assu_hashed_password;
        }
    });
    
    // 값이 유효한지 확인하는 함수
    /*var validatePresenceOf = function(value) {
        console.log('값이 유효한지 확인하는 함수 value : %s, value.length : %s', value, value.length);
        
        return value && value.length;
    };*/
    
    // 저장 시의 트리거 함수 정의 (password 필드가 유효하지 않으면 에러 발생)
    // 신규 데이터면 바로 저장하고, 기존 데이터면 유효성검사
    /*UserSchema.pre('save', function(next) {
        // 도큐먼트의 신규여부에 따라 true/false값 리턴
        if (!this.isNew) { return next(); }
        
        if (!validatePresenceOf(this.password)) {
            next(new Error('유효하지 않은 password 필드임'))    ;
        } else {
            next();
        }
    });*/
    
    // 필수 속성에 대한 유효성 확인 (길이값 체크)
    // path() : 스카마 타입 얻기
    // validate() : 검증을 수동으로진행 (save() 수행 전에 자동 트리거됨)
    UserSchema.path('email').validate(function(email) {
        return email.length;
    }, 'id 컬럼의 값이 없음');
    
    
    // 모델 객체에서 사용가능한 메소드 정의
    // 스키마에 static으로 findById 메소드 추가
    UserSchema.static('findByEmail', function(email, callback) {
        return this.find({email:email}, callback);
    });
    
    UserSchema.static('findAll', function(callback) {
        return this.find({}, callback);
    });
    
    console.log('UserSchema 정의함');
    
    return UserSchema;
};

// module.exports에 UserSchema 객체 직접 할당
module.exports = Schema;