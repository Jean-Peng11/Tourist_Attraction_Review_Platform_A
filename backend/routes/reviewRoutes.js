const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Submit review
router.post("/", async (req, res) => {
    const { attractionName, text, user } = req.body;

    const review = new Review({
        attractionName,
        text,
        user,
        verified: false
    });

    await review.save();
    res.json({ message: "Review submitted, pending verification" });
});

// Admin: Get pending reviews
router.get("/pending", async (req, res) => {
    const reviews = await Review.find({ verified: false });
    res.json(reviews);
});

// Admin: Verify review
router.post("/:id/verify", async (req, res) => {
    const id = req.params.id;
    const { approve } = req.body;

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (approve) {
        review.verified = true;
        await review.save();
    } else {
        await Review.findByIdAndDelete(id);
    }

    res.json({ message: "Review verification updated" });
});

module.exports = router;
