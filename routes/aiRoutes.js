const express = require("express");
const router = express.Router();
const { getSuggestedGoals} = require("../controller/aiController");

router.post("/suggest", getSuggestedGoals);

module.exports = router;