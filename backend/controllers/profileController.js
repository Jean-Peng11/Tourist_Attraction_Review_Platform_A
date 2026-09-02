const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updates,
            { new: true }
        ).select("-password");

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete account
exports.deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
