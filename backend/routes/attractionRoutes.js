const express = require("express");
const router = express.Router();
const Attraction = require("../models/Attraction");
const Review = require("../models/Review");

// Get attraction details
router.get("/:name", async (req, res) => {
    const name = req.params.name;

    const attraction = await Attraction.findOne({ name });
    const reviews = await Review.find({ attractionName: name, verified: true });

    if (!attraction) return res.status(404).json({ message: "Attraction not found" });

    res.json({ ...attraction.toObject(), reviews });
});

// Recommend attraction
router.post("/:name/recommend", async (req, res) => {
    const name = req.params.name;

    const attraction = await Attraction.findOne({ name });
    if (!attraction) return res.status(404).json({ message: "Attraction not found" });

    attraction.recommendedCount += 1;
    await attraction.save();

    res.json({ message: "Recommended count updated" });
});

// Admin: Add attraction
router.post("/admin/add", async (req, res) => {
    const { name, location, description } = req.body;

    const attraction = new Attraction({ name, location, description });
    await attraction.save();

    res.json({ message: "Attraction saved" });
});

module.exports = router;
