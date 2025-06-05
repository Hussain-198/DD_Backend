const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { task, description, status } = req.body;
    const newTask = await Task.create({
      userId: req.user.id,
      task,
      description,
      status,
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Error creating task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id, // ✅ fix field name
      userId: req.user.id,
    });
    res.json({ message: "Task Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
