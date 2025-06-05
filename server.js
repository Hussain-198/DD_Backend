const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors({
    credentials: true
}));
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).json({ message: "welcome" })
})

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const goalRoutes = require("./routes/goalRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/ai", aiRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

    })
    .catch((err) => console.error("MongoDB connection error: ", err));

app.listen(process.env.PORT || 5000, () =>
    console.log("Server running in port", process.env.PORT || 5000)
);