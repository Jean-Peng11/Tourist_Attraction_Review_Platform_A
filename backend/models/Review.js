const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    attractionName: String,
    user: String,
    text: String,
    verified: { type: Boolean, default: false }
});

module.exports = mongoose.model("Review", ReviewSchema);
