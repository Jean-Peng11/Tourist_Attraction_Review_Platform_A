const mongoose = require("mongoose");

const AttractionSchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    recommendedCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Attraction", AttractionSchema);
