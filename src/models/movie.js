const mongoose = require("mongoose");

const ReviewDetailsSchema = new mongoose.Schema({
  reviewText: { type: String },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviews: [ReviewDetailsSchema] 
});

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  releaseDate: String,
  movieId: { type: String, required: true },  //TBDM movie ID
  reviews: [ReviewSchema], 
  rating: { type: Number, default: 0 } // Average rating
});

module.exports = mongoose.model("Movie", MovieSchema);
