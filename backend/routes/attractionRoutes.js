const express = require("express");
const router = express.Router();
const Attraction = require("../models/Attraction");
const Review = require("../models/Review");

// Get all attractions for the home and management pages
router.get("/", async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: Add attraction
router.post("/admin/add", async (req, res) => {
    try {
        const { name, location, description } = req.body;
        const attraction = new Attraction({ name, location, description });
        await attraction.save();
        res.json({ message: "Attraction saved", attraction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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

// Admin: Update attraction
router.put("/:id", async (req, res) => {
    try {
        const { name, location, description } = req.body;
        const attraction = await Attraction.findByIdAndUpdate(
            req.params.id,
            { name, location, description },
            { new: true, runValidators: true }
        );
        if (!attraction) return res.status(404).json({ message: "Attraction not found" });
        res.json({ message: "Attraction updated", attraction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: Delete attraction
router.delete("/:id", async (req, res) => {
    try {
        const attraction = await Attraction.findByIdAndDelete(req.params.id);
        if (!attraction) return res.status(404).json({ message: "Attraction not found" });
        res.json({ message: "Attraction deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
