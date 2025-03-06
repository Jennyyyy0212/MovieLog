import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import reviewService from "../../services/review.service";
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";


const ReviewForm = ({ movie, onReviewAdded }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("Please log in to leave a review");
      return;
    }

    if (!movie) {
      setError("Please select a movie first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const reviewData = {
        movieId: movie.id,
        title: movie.title,
        reviewText,
        rating: Number(rating),
      };

      await reviewService.addReview(reviewData);
      setReviewText("");
      setRating(5);

      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (error) {
      console.error("Error adding review:", error);
      setError("Failed to add review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add Your Review
      </Typography>

      {/* Error Alert */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Rating Select */}
        <Box>
          <Typography variant="body1" gutterBottom>
            Rating
          </Typography>
          <Select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            fullWidth
            variant="outlined"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <MenuItem key={num} value={num}>
                {num} / 10
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Review Input */}
        <Box>
          <Typography variant="body1" gutterBottom>
            Your Review
          </Typography>
          <TextField
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            fullWidth
            multiline
            rows={4}
            placeholder="Share your thoughts..."
            variant="outlined"
          />
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Review"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ReviewForm;
