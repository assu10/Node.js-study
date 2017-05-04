/*******************************
TITLE: event 사용 - on() / 이미 정의되어 있는 이벤트 처리 (exit)
AUTHOR: Assu
DATE: 
*******************************/
process.on('exit', function() {
    console.log('exit 이벤트 발생함.');
});

setTimeout(function() {
    console.log('2초 후에 시스템 종료 시도.');
    process.exit();
}, 2000);