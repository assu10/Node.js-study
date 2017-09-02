/*******************************
TITLE: 모듈에 대해 알아보기

        exports와 module.exports 동시에 사용해보기
        -> module.exports가 우선으로 적용됨. 
           exports 전역변수는 무시됨
           
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

module.exports = {
    getUser: function() {
        return {id:'test01', name:'소녀시대'};
    },
    group: {id:'group01', name:'친구'}
};

exports.gruop = {id:'group02', name:'가족'};