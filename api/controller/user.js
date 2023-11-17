const axios = require('axios');

module.exports = {
    async login(req, res) {
        console.log('로그인  req.query', req.body);

        let { user_id } = req.body;

        if (!user_id) {
            return res.json("FAIL");
        }

        req.session.user_id = user_id;
        req.session.save();
        console.log('req.session=========================', req.session)

        return res.json( { type: 'SUCCESS', login_id: req.session.user_id});
    },
    async userInfo(req, res) {

        return res.json( { type: 'SUCCESS', user_id: req.session.user_id})
    },
    async signUp(req, res) {
        console.log('회원가입  req.query', req.body);

        let { user_id } = req.body;

        if (!user_id) {
            return res.json("FAIL");
        }

        return res.json( { type: 'SUCCESS', user_id});
    }
}