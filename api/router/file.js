const router = require("express").Router();
const file = require("../controller/file.js");
// const { utils } = require('../js/utils');

router.post('/uploadFiles', file.uploadFiles);
router.get('/all', file.allFiles);

module.exports = router;