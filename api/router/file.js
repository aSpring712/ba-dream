const router = require("express").Router();
const file = require("../controller/file.js");
// const { utils } = require('../js/utils');

// 이미지/영상 업로드
router.post('/uploadFiles', file.uploadFiles);
// 이미지/영상 휴지통으로 이동
router.post('/trash/:id', file.moveToTrashcan);
// 플레이리스트에 추가
router.post('/addPlayList', file.addPlayList);

// 전체 이미지/영상 조회
router.get('/all', file.allFiles);
// 휴지통 조회
router.get('/trash', file.allTrash);
// 최근 재생 된 컨텐츠 불러오기
router.get('/recentView', file.recentView);
// play Lsit 조회
router.get('/playList', file.getPlayList);

// 파일 영구 삭제
router.delete('/:id', file.delFile);
// 재생목록에서 삭제
router.delete('/playlist/:id', file.removePlayList);

module.exports = router;