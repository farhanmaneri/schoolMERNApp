const express = require("express");

const {
  getSchools,
  getSchool,
  addSchool,
  deleteSchool,
} = require("../controllers/school");
const router = express.Router();

router.get("/", getSchools);
router.get("/:id", getSchool);
router.delete("/:id", deleteSchool);
router.post("/", addSchool);


module.exports = router;
