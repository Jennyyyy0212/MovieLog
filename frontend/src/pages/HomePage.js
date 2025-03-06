import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Container } from "@mui/material";
import TrendingMovies from '../components/movies/TrendingMovie';
import movieService from '../services/movie.service';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await movieService.getTrendingMovies();
        setTrendingMovies(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "primary.dark",
          color: "white",
          textAlign: "center",
          p: 6,
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Track Your Movie Journey
        </Typography>
        <Typography variant="h6" mb={4}>
          Search for movies, save your thoughts, and keep track of your ratings
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="secondary" component={Link} to="/search">
            Search Movies
          </Button>
          <Button variant="contained" color="success" component={Link} to="/my-reviews">
            My Reviews
          </Button>
        </Box>
      </Box>

      {/* Trending Movies Section */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Trending This Week
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <TrendingMovies movies={trendingMovies} />
      )}
    </Container>
  );
};

export default HomePage;