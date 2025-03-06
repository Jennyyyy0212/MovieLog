import React, { useState, useEffect, useContext} from "react";
import reviewService from "../../services/review.service";
import { AuthContext } from "../../context/AuthContext"; 
import ReviewItems from "./ReviewItems";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

const ReviewList = ({ onReviewsFetched, reviews }) => {
  // Filter reviews to show only the logged-in user's review
  const { token, loading: authLoading } = useContext(AuthContext); // Get current user and loading state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use propReviews if provided, otherwise use local state
  //const reviews = propReviews || localReviews;
  
  // Function to fetch user reviews
  const fetchUserReviews = async () => {
    if (!token || authLoading) {
      console.log("Cannot get user info");
      return; // Prevent fetching if user is still loading
    }

    try {
      console.log("Token used:", token);
      const data = await reviewService.getUserReviews(); // Fetch only user's reviews
      console.log("Review API Response:", data); // Debug API response

      if (onReviewsFetched) {
        onReviewsFetched(data); // ✅ Pass data back if needed
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews when the component mounts
  useEffect(() => {
    const handleReviewAdded = () => {
      fetchUserReviews();
    };
    
    document.addEventListener("reviewAdded", handleReviewAdded);

    return () => {
      document.removeEventListener("reviewAdded", handleReviewAdded);
    };
  }, [token, authLoading]);

  return (
    <Paper sx={{ p: 4, mt: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Your Past Reviews
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <ReviewItems reviews={reviews} />
      )}
    </Paper>
  );
};

export default ReviewList;
