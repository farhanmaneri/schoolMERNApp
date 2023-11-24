const express = require("express");

const {getLeave,addLeave} = require("../controllers/leave");

const router = express.Router();

router.get("/", getLeave);
router.post('/', addLeave);

module.exports = router;