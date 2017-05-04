/*******************************
TITLE: event 사용 - 직접 만든 이벤트 처리
AUTHOR: Assu
DATE: 2017.05.04
*******************************/
process.on('tickAssu', function(count) {
    console.log('tickAssu 이벤트 발생함: ', count);
});

setTimeout(function() {
    console.log('2초 후에 tick 이벤트 전달 시도함.');
    process.emit('tickAssu', '10');
}, 2000);