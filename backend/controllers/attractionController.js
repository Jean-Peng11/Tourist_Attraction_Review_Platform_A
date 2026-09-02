const Attraction = require('../models/Attraction');

// Get all attractions
exports.getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single attraction
exports.getAttractionById = async (req, res) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        if (!attraction) return res.status(404).json({ message: "Attraction not found" });

        res.json(attraction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create attraction
exports.createAttraction = async (req, res) => {
    try {
        const newAttraction = new Attraction(req.body);
        await newAttraction.save();
        res.status(201).json(newAttraction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
