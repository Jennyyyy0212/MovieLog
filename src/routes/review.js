const express = require("express");
const auth = require("../middleware/auth");
const Movie = require("../models/Movie");

const router = express.Router();

// Add or Update a Personal Review
router.post("/", auth, async (req, res) => {
  try {
    const { movieId, title, reviewText, rating } = req.body;

    if (!rating) {
      return res.status(400).json({ message: "Rating are required" });
    }

    let movieReview = await Movie.findOne({ movieId });

    if (!movieReview) {
      movieReview = new Movie({
        title,
        movieId,
        reviews: [],
        rating: 0
      });
    }

    //check if the user already reviewed this movie
    let existingUserReview = movieReview.reviews.find(r => r.user.toString() === req.user.userId);

    if (!existingUserReview) {
      existingUserReview = {
        user: req.user.userId,
        reviews: []
      };
      movieReview.reviews.push(existingUserReview);
    }

    const userReviewIndex = movieReview.reviews.findIndex(r => r.user.toString() === req.user.userId);
    movieReview.reviews[userReviewIndex].reviews.push({ reviewText, rating });
    
    // Recalculate average rating
    const totalRatings = movieReview.reviews.flatMap(r => r.reviews.map(rev => rev.rating));
    movieReview.rating = totalRatings.reduce((sum, r) => sum + r, 0) / totalRatings.length;

    await movieReview.save();
    res.status(200).json(movieReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Personal Reviews
router.get("/", auth, async (req, res) => {
  try {

    const movies = await Movie.find({ "reviews.user": req.user.userId });

    const userReviews = movies.map(movie => {
      const userReview = movie.reviews.find(r => r.user.toString() === req.user.userId);
      return {
        movieId: movie.movieId,
        title: movie.title,
        userReviews: userReview ? userReview.reviews : []
      };
    });

    res.json({
      message: userReviews.length ? "Successfully fetched reviews" : "No reviews found",
      data: userReviews
    });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
