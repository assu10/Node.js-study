/*******************************
TITLE: 콜백 함수 - 함수가 결과값으로 리턴됨
AUTHOR: Assu
DATE: 2017.05.02
*******************************/
function add(a, b, callback) {
    var result = a+b;
    callback(result);
    
    var history = function() {
      return a + ' + ' + b + ' = ' + result;  
    };
    
    return history;
}

var add_history = add(10, 10, function(result) {
   console.log('파라미터로 전달된 콜백함수 호출됨.'); 
   console.log('10+10=', result);
});

/*
function() {
  return a + ' + ' + b + ' = ' + result;  
}
*/
console.log('결과값으로 받은 함수 실행 결과 add_history: ', add_history);

// 10 + 10 = 20
console.log('결과값으로 받은 함수 실행 결과 add_history(): ', add_history());