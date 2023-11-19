const axios = require('axios');

module.exports = {
    // 컨텐츠 업로드
    async uploadFiles(req, res) {
        console.log('파일 업로드')

        return res.json( { type: 'SUCCESS'});
    },
    // 휴지통에 추가 (임시 삭제 - 상태값 변경 또는 플레이 리스트 table에 추가)
    async moveToTrashcan(req, res) {
        console.log(req.body);
        // 휴지통으로 이동
        // 가장 최근 재생 된 컨텐츠 목록, 플레이 리스트에서 제거

        return res.json({type: "SUCCESS"});
    },
    // 플레이 리스트에 추가 (상태값 변경 또는 플레이 리스트 table에 추가)
    async addPlayList(req, res) {
        console.log('ADD PLAY LIST ===>',);    

        return res.json({type: "SUCCESS"});
    },
    // 전체 컨텐츠 조회
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
    // 휴지통 목록 조회
    async allTrash(req, res) {
        console.log('휴지통 목록');

        let data =  [{
            url: 'vedio_tmp.jpg',
            type: 'image',
            size: "4KB",
        }]

        return res.json({type: "SUCCESS", data})
    },
    // 최근 재생된 컨텐츠 조회
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
    // 플레이 리스트 조회
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
    // 영구 삭제
    async delFile(req, res) {
        console.log(req.params.id);

        return res.json({type: "SUCCESS"});
    },
    // 재생 목록에서 삭제
    async removePlayList(req, res) {
        console.log('재생목록에서 삭제 ==>', req.params);

        return res.json({ type: "SUCCESS" });
    }
}