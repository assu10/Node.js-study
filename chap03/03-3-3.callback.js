/*******************************
TITLE: 콜백 함수 - 리턴된 함수에서 자신을 만들어준 함수 내의 변수 접근(클로저)
AUTHOR: Assu
DATE: 2017.05.02
*******************************/
function add(a, b, callback) {
    var result = a+b;
    callback(result);
    
    var count = 0;
    var history = function() {
        count++;
        return count + ' : ' + a + ' + ' + b + ' = ' + result; 
    };
    return history;
}

var add_history = add(10, 10, function(result) {
   console.log('파라미터로 전달된 콜백함수 호출됨.'); 
   console.log('10+10=', result); 
});

console.log('결과값으로 받은 함수 실행 결과 : ', add_history());     // 1 : 10 + 10 = 20
console.log('결과값으로 받은 함수 실행 결과 : ', add_history());     // 2 : 10 + 10 = 20
console.log('결과값으로 받은 함수 실행 결과 : ', add_history());     // 3 : 10 + 10 = 20