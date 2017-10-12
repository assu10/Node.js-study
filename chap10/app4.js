/*******************************
TITLE: 채팅하기

        그룹 채팅하기
        
          'login' 이벤트 처리
          'message' 이벤트 처리할 때 command가 'groupchat'인 경우 해당 room 정보 찾아서 메시지 전송
          'room' 이벤트 처리 (command : create, update, delete, list)
        
            http://localhost:3000/public/chat04.html
        
AUTHOR: Assu
DATE: 2017.10.11
*******************************/

// Express 기본 모듈 호출
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 호출
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 호출
var expressSession = require('express-session');



//===== Passport 사용 =====//
var passport = require('passport');
var flash = require('connect-flash');



// 모듈로 분리한 설정 파일 호출
var config = require('./config');

// 모듈로 분리한 데이터베이스 파일 호출
var database = require('./database/database');

// 모듈로 분리한 라우팅 파일 호출
var route_loader = require('./route/route_loader');


// socket.io 사용
var socketio = require('socket.io');

// cors 사용 : 클라이언트에서 ajax로 요청하면 CORS로 지원
var cors = require('cors');

// 익스프레스 객체 생성
var app = express();

//===== 뷰 엔진 설정 =====//
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
console.log('뷰 엔진이 ejs로 설정되었습니다.');


//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));
 
// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
  secret:'my key',
  resave:true,
  saveUninitialized:true
}));



//===== Passport 사용 설정 =====//

// passport의 세션을 사용할 때는 그 전에 Express의 세션을 사용하는 코드가 있어야 함.
app.use(passport.initialize());     // 패스포트 초기화 시엔 passport.initialize() 미들웨어 필요
app.use(passport.session());        // 로그인 세션 유지시엔 passport.session() 미들웨어 필요
app.use(flash());


// CORS를 미들웨어로 사용하도록 등록
// 클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원

app.use(cors());


// 라우팅 정보를 읽어들여 라우팅 설정
var router = express.Router();
route_loader.init(app, router);

// 패스포트 설정
var configPassport = require('./config/passport');
configPassport(app, passport);

// 패스포트 라우팅 설정
var userPassport = require('./route/user_passport');
userPassport(router, passport);



//===== Passport 관련 라우팅 =====//

// 모듈화 : user_passport.js로 분리



//===== Passport Strategy 설정 =====//

// 모듈화 : local_login.js와 local_signsup.js로 분리
// 모듈화 : passport.js로 분리


// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
 static: {
   '404': './chap06/public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


//===== 서버 시작 =====//

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
  console.log("Express 서버 객체가 종료됩니다.");
  if (database.db) {
    database.db.close();
  }
});


// Express 서버 시작 : 시작된 서버 객체를 리턴받도록 함.
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

  // 데이터베이스 연결을 위한 함수 호출
  database.init(app, config);
});


//===== Socket.IO를 이용한 채팅 테스트 부분 =====//

// 로그인 아이디 매핑 (로그인 ID -> 소켓 ID)
var login_ids = {};

// socket.io 서버 시작
var io = socketio.listen(server);
console.log('socket.io 요청을 받아들일 준비가 되었습니다.');


// 클라이언트가 연결했을 때의 이벤트 처리
io.sockets.on('connection', function(socket) {
	console.log('connection info :', socket.request.connection._peername);

    // 소켓 객체에 클라이언트 Host, Port 정보 속성으로 추가
    socket.remoteAddress = socket.request.connection._peername.address;
    socket.remotePort = socket.request.connection._peername.port;
    
    // 'login' 이벤트를 받았을 때의 처리
    socket.on('login', function(login) {
        console.log('login 이벤트를 받았습니다.');
    	console.dir(login);
        
        // 기존 클라이언트 ID가 없으면 클라이언트 ID를 맵에 추가
        console.log('접속한 소켓의 ID : ', socket.id);
        
        // login_ids 변수에 로그인 ID값을 속성 이름으로 추가하고, 그 속성 값으로 소켓의 ID값을 할당함.
        login_ids[login.id] = socket.id;
        
        // 소켓 객체에도 속성을 추가할 수 있으므로 각각의 소켓 객체에서 바로 로그인 ID를 확인할 수 있도록
        // 소켓 객체에 login_id 속성을 추가함
        socket.login_id = login.id;
        
        console.log('접속한 클라이언트 ID 갯수 : %d', Object.keys(login_ids).length);
        
        // 응답 메시지 전송
        sendResponse(socket, 'login', '200', '로그인되었습니다.');
    });
    
    // 'message' 이벤트를 받았을 때의 처리
    socket.on('message', function(message) {
    	console.log('message 이벤트를 받았습니다.');
    	console.dir(message);
    	
        if (message.recepient === 'ALL') {
            // 나를 포함한 모든 클라이언트에게 메시지 전달
        	console.dir('나를 포함한 모든 클라이언트에게 message 이벤트를 전송합니다.');
            io.sockets.emit('message', message);
        } else {
            // 일대일 채팅 대상에게 메시지 전달
            if (login_ids[message.recepient]) {
                io.sockets.connected[login_ids[message.recepient]].emit('message', message);
                // 응답 메시지 전송
                sendResponse(socket, 'message', '200', '메시지를 전송했습니다.');
            } else {
                // 응답 메시지 전송
                sendResponse(socket, 'login', '404', '상대방의 로그인 ID를 찾을 수 없습니다.');
            }
        }
    });
    
    // 'room' 이벤트를 받았을 때의 처리
    socket.on('room', function(room) {
        console.log('room 이벤트를 받았습니다.');
    	console.dir(room);
        
        if (room.command === 'create') {
            // 방이 이미 만들어져 있는 경우
            if (io.sockets.adapter.rooms[room.roodId]) {
                console.log('방이 이미 만들어져 있습니다.');
            } else {
                console.log('방을 새로 만듭니다.');
                
                // 방에 입장함. 방이 없으면 방을 새로 만든 후 입장함.
                socket.join(room.roomId);
                var curRoom = io.sockets.adapter.rooms[room.roomId];
                curRoom.id = room.roomId;
	            curRoom.name = room.roomName;
	            curRoom.owner = room.roomOwner;
            }
        } else if (room.command === 'update') {
            var curRoom = io.sockets.adapter.rooms[room.roomId];
            curRoom.id = room.roomId;
            curRoom.name = room.roomName;
            curRoom.owner = room.roomOwner;
        } else if (room.command === 'delete') {
            // 방에서 나옴.
            socket.leave(room.roomId);
            
            if (io.sockets.adapter.rooms[room.roomId]) {
                delete io.sockets.adapter.rooms[room.roodId];
            } else {
                console.log('방이 만들어져 있지 않습니다.');
            }
        }
        
        var roomList = getRoomList();
        
        // command 속성은 list로, rooms 속성값은 배열로 만든 방 리스트로 설정.
        var output = {command:'list', rooms:roomList};
        console.log('클라이언트로 보낼 데이터 : ' + JSON.stringify(output));
        
        io.sockets.emit('room', output);
    });
});


// 방 리스트를 배열로 만들어 줌.
// 기본 방을 제외하고 사용자가 만든 방 리스트를 배열로 만들어 줌.
// 기본 방은 socket.join() 메소드가 만든 것이 아니라 처음부터 만들어져 있던 방임.
function getRoomList() {
    console.log('getRoomList : ', io.sockets.adapter.rooms);
    
    var roomList = [];
    
    Object.keys(io.sockets.adapter.rooms).forEach(function(roomId) {
        console.log('current room id : ' + roomId);
    	var outRoom = io.sockets.adapter.rooms[roomId];
        
        var foundDefault = false;
        var index = 0;
        Object.keys(outRoom.sockets).forEach(function(key) {
            console.log('#' + index + ' : ' + key + ', ' + outRoom.sockets[key]);
            
            // 기본방
            // 기본방의 특성은 방의 이름과 그 안에 있는 속성의 이름이 같음.
            if (roomId == key) {
                foundDefualt = true;
                console.log('기본방임.');
            }
            index++;
        });
        
        if (!foundDefault) {
            roomList.push(outRoom);
        }
        
        console.log('[ROOM LIST]');
        console.dir(roomList);
    
        return roomList;
    });
}

// 응답 메시지 전송 메소드
function sendResponse(socket, command, code, message) {
	var statusObj = {command: command, code: code, message: message};
	socket.emit('response', statusObj);
}