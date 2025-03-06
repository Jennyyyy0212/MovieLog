import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation
import { Outlet } from "react-router-dom";
import ReviewList from "../components/reviews/ReviewList";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


const UserReviewPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [reviews, setReviews] = useState([]); // Add reviews state
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL
  



  // Check if we're at the base /my-reviews route
  const isBaseRoute = location.pathname === "/my-reviews";

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate("/my-reviews/movie_search", { state: { query: searchQuery } });
    } else {
      navigate("/my-reviews/movie_search");
    }
    setSearchQuery(""); // Optional: Clear input after search
  };

  const handleReviewsFetched = (data) => {
    console.log("Reviews fetched in UserReviewPage:", data); // Debug
    setReviews(data); // Update local reviews state
  };

  const handleReviewAdded = () => {
    // Trigger a re-fetch by calling ReviewList's fetch logic indirectly
    document.dispatchEvent(new Event("reviewAdded")); // Use the existing event
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Movie Review Section 🎬
      </Typography>

      {/* Show search UI only at /my-reviews */}
      {isBaseRoute && (
        <Paper sx={{ p: 3, my: 3 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Paper>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Render nested routes */}
      <Outlet context={{ onReviewAdded: handleReviewAdded }} />

      {/* Reviews Section */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          My Reviews
        </Typography>
        <ReviewList onReviewsFetched={handleReviewsFetched} reviews={reviews} />
      </Paper>
    </Container>
    
  );
};

export default UserReviewPage;