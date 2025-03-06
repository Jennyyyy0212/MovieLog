require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const externalRoutes = require("./routes/external");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");
const reviewRoutes = require("./routes/review");

const app = express();
// Increase allowed header size
app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true // If you need to send cookies/auth headers
}));

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/external", externalRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("Personal Movie Review API is running!");
});

const PORT = process.env.PORT || 8000; //backend port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
