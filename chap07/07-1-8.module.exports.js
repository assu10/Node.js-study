/*******************************
TITLE: 모듈에 대해 알아보기
            
            module.exports에 인스턴스 객체를 만들어 할당 (2번에 해당)

        1. 함수 할당
        2. 인스턴스 객체 할당
        3. 프로토타입 객체 할당
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

// 사용 패턴 : module.exports에 객체로부터 new 연산자로 생성된 인스턴스 객체를 할당한 수
//            그 인스턴스 객체의 함수 호출함.

// 생성자 함수
function User(id, name) {
    this.id = id;
    this.name = name;
}

// User 객체의 속성으로 함수나 값을 추가할때는 User.prototype 객체에 속성으로 추가
User.prototype.getUser = function() {
    return {id:this.id, name:this.name};
}

User.prototype.group = {id:'group01', name:'친구'};

User.prototype.printUser = function() {
    console.log('user 이름 : %s, group 이름 : %s', this.name, this.group.name);
}

module.exports = new User('test01', '소녀시대');