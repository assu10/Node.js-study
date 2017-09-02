/*******************************
TITLE: 모듈에 대해 알아보기

        module.exports에 함수 직접 할당하기
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

// module.exports에 인터페이스(함수 객체)를 그대로 할당 가능
module.exports = function() {
    return {id:'test01', name:'소녀시대'};
};
