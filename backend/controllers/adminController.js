const User = require('../models/User');
const Attraction = require('../models/Attraction');
const Review = require('../models/Review');

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an attraction
exports.deleteAttraction = async (req, res) => {
    try {
        await Attraction.findByIdAndDelete(req.params.id);
        res.json({ message: "Attraction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an attraction
exports.updateAttraction = async (req, res) => {
    try {
        const updated = await Attraction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
