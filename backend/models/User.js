const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    role: { type: String, default: "tourist" }
});

module.exports = mongoose.model("User", UserSchema);
