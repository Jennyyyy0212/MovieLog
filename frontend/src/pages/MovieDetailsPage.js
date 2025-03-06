import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import movieService from '../services/movie.service';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Grid,
    Typography,
  } from "@mui/material";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import StarIcon from "@mui/icons-material/Star";
  import RateReviewIcon from "@mui/icons-material/RateReview";

const MovieDetail = () => {
    const { id } = useParams(); // Get movie ID from URL
    const navigate = useNavigate();
    const location = useLocation();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchMovie = async () => {
          try {
              const data = await movieService.getMovie(id); // Use your `getMovie` function
              setMovie(data);
          } catch (error) {
              setError(error.message);
          } finally {
              setLoading(false);
          }
      };
  
      if (id) fetchMovie();
    }, [id]);


    if (loading)
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        );
    
      if (error)
        return (
          <Container maxWidth="md">
            <Typography variant="h6" color="error" textAlign="center">
              Error: {error}
            </Typography>
          </Container>
        );

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Back Button */}
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(location.state?.from || "/search")}
        sx={{ mb: 3 }}
      >
        Back to Search
      </Button>

      {/* Movie Details Card */}
      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, p: 3 }}>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          sx={{ width: { xs: "100%", md: 300 }, borderRadius: 2 }}
        />

        <CardContent sx={{ flex: 1, ml: { md: 3 }, textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={1}>
            <strong>Release Date:</strong> {movie.release_date}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <StarIcon color="warning" />
            <Typography variant="body1">
              <strong>Rating:</strong> {movie.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mb={2}>
            <strong>Overview:</strong> {movie.overview}
          </Typography>

          {/* Write Review Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<RateReviewIcon />}
            onClick={() => navigate(`/my-reviews/write_review/${id}`)}
          >
            Write a Review
          </Button>
        </CardContent>
      </Card>
    </Container>
    );
};

export default MovieDetail;

