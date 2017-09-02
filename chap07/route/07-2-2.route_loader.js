/*******************************
TITLE: 라우팅 모듈을 로딩하여 설정
        라우팅 모듈 파일에 대한 정보는 config.js의 route_info 배열에 등록
        
        어떤 라우팅 모듈들이 있는지 확인한 후 해당 모듈 파일들을 읽어서 실행
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

var route_loader = {};

var config = require('../07-2-2.config');

route_loader.init = function(app, router) {
    console.log('route_loader.init 호출됨.');
    return initRouter(app, router);
};

// route_info에 정의된 라우팅 정보 처리
function initRouter(app, router) {
    var infoLen = config.route_info.length;
    console.log('설정에 정의된 라우팅 모듈의 수 : %d', infoLen);
    
    for (var i=0; i<infoLen; i++) {
        var curItem = config.route_info[i];
        
        // 모듈 파일에서 모듈 불러옴
        var curModule = require(curItem.file);
        
        // 라우팅 처리
        if (curItem.type == 'get') {
            router.route(curItem.path).get(curModule[curItem.method]);
        }  else if (curItem.type == 'post') {
            router.route(curItem.path).post(curModule[curItem.method]);
		} else {
			router.route(curItem.path).post(curModule[curItem.method]);
		}
        
        console.log('라우팅 모듈 [%s]이(가) 설정됨.', curItem.method);
    }
    
    // 라우터 객체 등록
    app.use('/', router);
}

module.exports = route_loader;