const mongoose  = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    task: String,
    description: String,
    status: {type: String, enum: ["To Do", "In Progress", "Done"], default:"To Do"},
    Date: {type:Date, default:Date.now}
})

module.exports = mongoose.model("Task",taskSchema);