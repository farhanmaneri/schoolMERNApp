const express = require("express");

const {getUsers,createUser,userAuthentication, changePassword} = require("../controllers/user");

const router = express.Router();

router.get("/", getUsers);
router.post('/signup', createUser);
router.post('/login',userAuthentication);
router.post('/change-password', changePassword);

module.exports = router;