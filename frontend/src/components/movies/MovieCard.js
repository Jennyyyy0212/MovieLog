import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Box, Chip } from "@mui/material";


const MovieCard = ({ movie }) => {
  // Handle case where movie poster path is null
  const location = useLocation()
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-poster.jpg';
    
  // Format release date to display year only
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'Unknown';

  return (
    <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
      {/* Movie Poster */}
      <CardMedia
        component="img"
        height="400"
        image={posterUrl}
        alt={`${movie.title} poster`}
        onError={(e) => { e.target.src = "/placeholder-poster.jpg"; }}
        sx={{ objectFit: "cover" }}
      />

      {/* Movie Details */}
      <CardContent>
        <Typography variant="h6" fontWeight="bold" noWrap gutterBottom>
          {movie.title}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            {releaseYear}
          </Typography>

          <Chip
            label={`${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10`}
            color="primary"
            size="small"
          />
        </Box>

        {/* View Details Button */}
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          component={Link}
          to={`/movie/${movie.id}`}
          state={{ from: location.pathname + location.search }}
          sx={{ mt: 2 }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default MovieCard;