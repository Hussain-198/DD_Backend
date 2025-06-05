const Goal = require("../models/Goal");

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userEmail: req.user.email });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch goals" });
  }
};

exports.getSingleGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!goal) return res.status(404).json({ error: "Goal not found" });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch goal" });
  }
};

exports.createGoal = async (req, res) => {
  try {
    const { title, targetDate } = req.body;

    if (!title || !targetDate) {
      return res.status(400).json({ error: "Title and targetDate are required" });
    }

    if (!req.user || !req.user.id || !req.user.email) {
      return res.status(401).json({ error: "Invalid or missing user info in token" });
    }

    const goal = await Goal.create({
      userId: req.user.id,
      userEmail: req.user.email,
      title,
      targetDate,
    });

    res.status(201).json(goal);
  } catch (err) {
    console.error("Goal creation error:", err);
    res.status(500).json({ error: "Failed to create goal" });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!goal) return res.status(404).json({ error: "Goal not found" });

    // Update fields
    if (req.body.title !== undefined) goal.title = req.body.title;
    if (req.body.targetDate !== undefined) goal.targetDate = req.body.targetDate;
    if (req.body.completed !== undefined) {
      goal.completed = req.body.completed;

      if (req.body.completed === true && !goal.completedAt) {
        goal.completedAt = new Date();
      } else if (req.body.completed === false) {
        goal.completedAt = null;
      }
    }

    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: "Failed to update goal" });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete goal" });
  }
};
