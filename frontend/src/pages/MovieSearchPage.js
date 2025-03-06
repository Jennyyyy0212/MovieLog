import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import movieService from '../services/movie.service';
import MovieCard from "../components/movies/MovieCard"; 
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";




const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("query") || ""; // Get `query` from URL


  useEffect(() => {
    if (initialQuery) {
      fetchMovies(initialQuery);
    }
  }, [initialQuery]); // Runs only when `initialQuery` changes

  const fetchMovies = async (searchTerm) => {
    setLoading(true);
    setError("");

    try {
      console.log("Searching for:", searchTerm);
      const response = await movieService.searchMovie(searchTerm.trim());
      console.log("Service response:", response.data);
      
      const movieResults = Array.isArray(response) ? response : []; 
      setMovies(movieResults);

      if (movieResults.length === 0) {
        setError("No movies found");
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      console.error("Error searching movies:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }

    // Update the URL with the new search term
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);

    // Trigger a new search
    fetchMovies(query.trim());
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Page Title */}
      <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
        Movie Search <span role="img" aria-label="movie">🎬</span>
      </Typography>

      {/* Search Form */}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ maxWidth: 500 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ px: 3 }}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Typography variant="h6" color="error" textAlign="center" mb={4}>
          {error}
        </Typography>
      )}

      {/* Movie Results Grid */}
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieSearch;
