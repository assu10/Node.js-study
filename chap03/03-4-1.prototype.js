/*******************************
TITLE: 프로토타입 객체 생성
AUTHOR: Assu
DATE: 2017.05.02
*******************************/
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Person 객체에 walk 함수를 속성으로 추가
Person.prototype.walk = function(speed) {
    console.log(speed + 'km 속도로 걸어갑니다.');
};

var person01 = new Person('소녀시대', 20);
var person02 = new Person('걸스데이', 22);

console.log(person01.name + ' 객체의 walk(10) 호출함.');
person01.walk(10);


//////////////////////////////////////////////////////////////////

Person.walk = function(speed) {
    console.log(speed + 'km 속도로 걸어갑니다.');
};
Person.walk(20);