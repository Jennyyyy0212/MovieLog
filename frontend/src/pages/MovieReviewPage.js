import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, useOutletContext } from "react-router-dom";
import movieService from '../services/movie.service'; // Import movie API
import ReviewForm from "../components/reviews/ReviewForm";
import ReviewList from "../components/reviews/ReviewList";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MovieReviewPage = () => {
  const { id } = useParams(); //  Get movie ID from URL
  const navigate = useNavigate();
  const location = useLocation();
  const { onReviewAdded } = useOutletContext(); // Get callback from Outlet context
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      console.log("Movie ID from useParams:", id); // Debug the ID
      try {
        const data = await movieService.getMovie(id); // Use your `getMovie` function
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("Movie not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  const handleReviewAddedLocal = async () => { // Make async
    if (onReviewAdded) {
      await onReviewAdded(); // Wait for the fetch to complete
    }
    navigate("/my-reviews"); // Navigate to base route to show updated ReviewList
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container maxWidth="md">
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Back Button */}
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(location.state?.from || "/my-reviews/movie_search")}
        sx={{ mb: 3 }}
      >
        Back to Search
      </Button>

      {/* Movie Details */}
      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, p: 3, mb: 4 }}>
        <CardMedia
          component="img"
          image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder-poster.jpg"}
          alt={movie.title}
          sx={{ width: { xs: "100%", md: 250 }, borderRadius: 2 }}
        />
        <CardContent sx={{ flex: 1, ml: { md: 3 }, textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h5" fontWeight="bold">
            {movie.title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {movie.release_date?.split("-")[0] || "Unknown Year"}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            <strong>Overview:</strong> {movie.overview}
          </Typography>
        </CardContent>
      </Card>

      {/* Review Form */}
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Write Your Review
        </Typography>
        <ReviewForm movie={movie} onReviewAdded={handleReviewAddedLocal} />
      </Paper>
    </Container>
  );
};

export default MovieReviewPage;
