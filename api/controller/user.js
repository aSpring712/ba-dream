const axios = require('axios');
const jwt = require('../js/jwt.js');

module.exports = {
    async login(req, res) {
        console.log('로그인  req.query', req.body);

        let { user_id } = req.body;

        if (!user_id) {
            return res.json("FAIL");
        }

        const jwtToken = await jwt.sign(user_id);
        console.log('LOGIN CONTROLLER JWT TOKEN ==> ', jwtToken);
        res.cookie('token', jwtToken.token, {maxAge: 86400000, httpOnly: true}); // 1일 유지

        req.session.user_id = user_id;
        req.session.save();
        // console.log('req.session=========================', req.decode)

        return res.json( { type: 'SUCCESS', login_id: user_id});
    },
    async userInfo(req, res) {
        // if(!req.decode.user_id) return res.json({type:'fail'}); 
        if(!req.session.user_id) return res.json({type:'fail'}); 
        // console.log('req.session=========================', req.decode)
        console.log('REQ SESSION', req.session)
        // const user_id = req.decode.user_id;
        let user_id = req.session.user_id
        return res.json( { type: 'SUCCESS', user_id})
    },
    async signUp(req, res) {
        console.log('회원가입  req.query', req.body);

        let { user_id } = req.body;

        if (!user_id) {
            return res.json("FAIL");
        }

        return res.json( { type: 'SUCCESS', user_id});
    },
    async logout(req, res) {
        console.log('REQUEST LOGOUT', req.session.user_id);
        req.session.user_id = null;

        res.clearCookie('token');
        res.clearCookie('refreshToken');
        
        return res.json(200);
    }
}