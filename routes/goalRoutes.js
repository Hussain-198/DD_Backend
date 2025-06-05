const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
    getGoals,
    getSingleGoal,
    createGoal,
    updateGoal,
    deleteGoal
} = require("../controller/goalController");

router.get("/",auth, getGoals);
router.get("/:id", auth, getSingleGoal);
router.post("/",auth, createGoal);
router.put("/:id",auth, updateGoal);
router.delete("/:id",auth, deleteGoal);

module.exports = router;
