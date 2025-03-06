import React from 'react';
import { Grid, Typography, Container, Box } from "@mui/material";
import MovieCard from './MovieCard';

const TrendingMovies = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p>No trending movies available at the moment.</p>;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Trending Movies
      </Typography>

      {(!movies || movies.length === 0) ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="textSecondary">
            No trending movies available at the moment.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TrendingMovies;