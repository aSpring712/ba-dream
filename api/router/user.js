const router = require("express").Router();
const user = require("../controller/user.js");
const jwt = require('../js/jwt.js');

router.post('/login', user.login);
router.post('/signUp', user.signUp);

// router.get('/userInfo', jwt.token_decode, user.userInfo);
router.get('/userInfo', user.userInfo);
router.get('/logout', user.logout);

module.exports = router;