const axios = require('axios');

module.exports = {
    async uploadFiles(req, res) {
        console.log('파일 업로드 req.query', req.body);

        // let { user_id } = req.body;

        // if (!user_id) {
        //     return res.json("FAIL");
        // }

        // const jwtToken = await jwt.sign(user_id);
        // console.log('LOGIN CONTROLLER JWT TOKEN ==> ', jwtToken);
        // res.cookie('token', jwtToken.token, {maxAge: 86400000, httpOnly: true}); // 1일 유지

        // req.session.user_id = user_id;
        // req.session.save();
        // // console.log('req.session=========================', req.decode)

        // return res.json( { type: 'SUCCESS', login_id: user_id});
    },
    async allFiles(req, res) {
        console.log('전체 파일 조회');
        return res.json([])
    }
}