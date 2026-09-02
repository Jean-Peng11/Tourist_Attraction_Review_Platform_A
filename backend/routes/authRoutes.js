const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Sign Up
router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ email, password, name });
    await user.save();

    res.json({ message: "Sign up success" });
});

// Log In
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
        message: "Login success",
        user: {
            email: user.email,
            name: user.name,
            role: user.role
        }
    });
});

module.exports = router;
