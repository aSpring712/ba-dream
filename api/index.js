// express
const express = require('express');
const bodyParser = require('body-parser');
const jwt = './js/jwt.js';

// session
const session = require('express-session');
// var fileStore = require('session-file-store')(session);

const userRouter = require("./router/user.js"); // 유저 라우터
const fileRouter = require("./router/files.js");   // 파일 라우터

const app = express();

// session
app.use(session({
    // key: 'id',
    resave: false, // 세션을 언제나 저장할지 설정함
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
    secret: 'ba-dream-test', // 암호화하는 데 쓰일 키
    // store: new fileStore({logFn: function(){}}), //memory leak
    cookie: { //세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
        httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
        secure: false,
        maxAge: 86400000,
    }
}));

// receive req.body
app.use(express.json({
    limit: '300mb'
}));

app.all('/*', (req,res,next) => {
    next();
});

app.use("/user", userRouter);
app.use("/file", fileRouter);

module.exports = {
    path: '/api',
    handler: app
}