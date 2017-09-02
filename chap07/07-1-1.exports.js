/*******************************
TITLE: 모듈에 대해 알아보기

        exports 객체의 속성으로 함수와 객체 추가하기
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

// exports 객체의 속성으로 함수 추가
// 사용자 정보를 객체로 반환받아 확인하려고 만든 함수
exports.getUser = function() {
    return {id:'test01', name:'소녀시대'};
};

// exports 객체의 속성으로 객체 추가
exports.group = {id:'group01', name:'친구'};