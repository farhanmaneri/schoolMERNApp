const express = require("express");

const {getUsers,createUser,getUser} = require("../controllers/user");

const router = express.Router();

router.get("/", getUsers);
router.post('/signup', createUser);
router.get('/login',getUser);

module.exports = router;