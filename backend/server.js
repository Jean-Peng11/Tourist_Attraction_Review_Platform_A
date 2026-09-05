
// ----------------------
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
// 1. Import modules
// ----------------------
const express = require("express");
const cors = require("cors");

// ----------------------
// 2. Connect to MongoDB
// ----------------------
const connectDB = require("./config/db");
connectDB();

// ----------------------
// 3. Load models
// ----------------------
const User = require("./models/User");
const Attraction = require("./models/Attraction");
const Review = require("./models/Review");

// ----------------------
// 4. Create Express app
// ----------------------
const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// 5. Use routes
// ----------------------
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/attractions", require("./routes/attractionRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

// ----------------------
// 6. Default route
// ----------------------
app.get("/", (req, res) => {
    res.send("Tourist Attraction Review Platform Backend Running");
});

// ----------------------
// 7. Start server
// ----------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
