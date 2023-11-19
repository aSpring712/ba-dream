const axios = require('axios');

module.exports = {
    async uploadFiles(req, res) {
        console.log('파일 업로드 req.query', req.query);
        console.log('파일 업로드 req.query', req.files);

        return res.json( { type: 'SUCCESS'});
    },
    async moveToTrashcan(req, res) {
        console.log(req.body);

        return res.json({type: "SUCCESS"});
    },
    async addPlayList(req, res) {
        console.log('ADD PLAY LIST ===>',);    

        return res.json({type: "SUCCESS"});
    },
    async allFiles(req, res) {
        console.log('전체 파일 조회');

        let data =  [{
            url: 'ship.jpg',
            type: 'image',
            size: "4KB",
            list: false,
        },
        {
            url: 'book.jpg',
            type: 'image',
            size: "4KB",
            list: true,
        }]

        return res.json({type: "SUCCESS", data})
    },
    async allTrash(req, res) {
        console.log('휴지통 목록');

        let data =  [{
            url: 'vedio_tmp.jpg',
            type: 'image',
            size: "4KB",
        }]

        return res.json({type: "SUCCESS", data})
    },
    recentView(req, res) {
        console.log('최근 재생된 컨텐츠 불러오기');

        let data =  [{
            url: 'card1.png',
            type: 'image',
            size: "4KB",
        },
        {
            url: 'book.jpg',
            type: 'image',
            size: "4KB",
        },
        {
            url: 'sun.jpg',
            type: 'image',
            size: "4KB",
        }]

        return res.json({type: "SUCCESS", data})
    },
    getPlayList(req, res) {
        let data =  [
        {
            url: 'book.jpg',
            type: 'image',
            size: "4KB",
        },
        {
            url: 'sun.jpg',
            type: 'image',
            size: "4KB",
        }]

        return res.json({type: "SUCCESS", data})
    },
    async delFile(req, res) {
        console.log(req.params.id);

        return res.json({type: "SUCCESS"});
    }
}