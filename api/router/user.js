const router = require("express").Router();
const user = require("../controller/user.js");

router.post('/login', user.login);
router.post('/signUp', user.signUp);

router.get('/userInfo', user.userInfo);

module.exports = router;