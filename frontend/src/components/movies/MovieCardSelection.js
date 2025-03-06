import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Box, Chip } from "@mui/material";


const MovieCardSelect = ({ movie, isSelected, onSelect }) => {
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
    <Card
      sx={{
        maxWidth: 300,
        borderRadius: 2,
        boxShadow: isSelected ? 6 : 3,
        transition: "0.3s",
        border: isSelected ? "2px solid #1976d2" : "none",
        "&:hover": { boxShadow: 6, cursor: "pointer" },
      }}
      onClick={onSelect}
    >
      {/* Movie Poster */}
      <CardMedia
        component="img"
        height="400"
        image={posterUrl}
        alt={`${movie.title} poster`}
        onError={(e) => {
          e.target.src = "/placeholder-poster.jpg";
        }}
        sx={{ objectFit: "cover" }}
      />

      {/* Movie Details */}
      <CardContent>
        <Typography variant="h6" fontWeight="bold" noWrap gutterBottom>
          {movie.title}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2" color="textSecondary">
            {releaseYear}
          </Typography>

          <Chip
            label={`${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10`}
            color="primary"
            size="small"
          />
        </Box>

        {/* Select Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          component={Link}
          to={`/my-reviews/write_review/${movie.id}`}
          state={{ movie }}
        >
          Select
        </Button>
      </CardContent>
    </Card>
  );
};

export default MovieCardSelect;