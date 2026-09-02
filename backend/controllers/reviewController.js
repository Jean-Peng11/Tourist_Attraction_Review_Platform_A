const Review = require('../models/Review');

// Get reviews for an attraction
exports.getReviewsByAttraction = async (req, res) => {
    try {
        const reviews = await Review.find({ attractionId: req.params.id });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add review
exports.addReview = async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
