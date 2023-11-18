const axios = require('axios');

module.exports = {
    async uploadFiles(req, res) {
        console.log('파일 업로드 req.query', req.query);
        console.log('파일 업로드 req.query', req.files);

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

        return res.json( { type: 'SUCCESS'});
    },
    async moveToTrashcan(req, res) {
        console.log('파일 휴지통으로 이동', req.params);

        return res.json({type: "SUCCESS"});
    },
    async allFiles(req, res) {
        console.log('전체 파일 조회');
        return res.json([])
    },
    async delFile(req, res) {
        console.log(req.params.id);

        return res.json({type: "SUCCESS"});
    }
}