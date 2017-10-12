/*******************************
TITLE: 객체를 선언과 동시에 속성 초기화
AUTHOR: Assu
DATE: 2017.05.02
*******************************/
var Person = {
    age: 20,
    name: '소녀시대',
    add: function(a, b) {
        return a+b;
    }
};

console.log('10+10=', Person.add(10, 10));