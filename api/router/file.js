const router = require("express").Router();
const file = require("../controller/file.js");
// const { utils } = require('../js/utils');

router.post('/uploadFiles', file.uploadFiles);
router.post('/:id', file.moveToTrashcan);
router.get('/all', file.allFiles);
router.delete('/:id', file.delFile);

module.exports = router;