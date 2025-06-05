const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        res.status(201).json({ message: "Register Successful" });
    } catch (err) {
        res.status(500).json({ error: "Register Failed" });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password })
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Incorrect password" });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2d" });
        res.json({ token, user: { name: user.name, email: user.email } });
    } catch {
        res.status(500).json({ error: "Login failed" });
    }
}