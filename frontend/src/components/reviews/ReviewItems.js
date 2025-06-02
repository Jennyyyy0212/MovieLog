import React, { useState, useEffect} from "react";
import movieService from '../../services/movie.service';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  CircularProgress,
  Avatar,
  TableContainer,
  Box
} from "@mui/material"


const ReviewItems = ({ reviews }) => {
    // State to store movie details
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);

  const safeReviews = Array.isArray(reviews) ? reviews : [];

   // Extract user review data
  const userReviews = safeReviews.flatMap(movie => movie.userReviews.map(review => ({
    movieId: movie.movieId,
    title: movie.title,
    reviewText: review.reviewText,
    rating: review.rating,
    createdAt: review.createdAt,
  })));

  // Fetch movie details for each unique movieId
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const uniqueMovieIds = [...new Set(userReviews.map(review => review.movieId))];
        const moviePromises = uniqueMovieIds.map(async (movieId) => {
          const response = await movieService.getMovie(movieId);
          return { movieId, data: response }; // Assuming response.data contains movie details
        });
        const movieResults = await Promise.all(moviePromises);
        const movieData = movieResults.reduce((acc, { movieId, data }) => {
          acc[movieId] = data;
          return acc;
        }, {});
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userReviews.length > 0) {
      fetchMovieDetails();
    } else {
      setLoading(false); // No reviews, no need to fetch
    }
  }, [reviews]); // Depend on `reviews` prop to refetch when it changes


  return (
    <Box sx={{ mt: 2 }}>
      {userReviews.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            {/* Table Header */}
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><strong>Review Date</strong></TableCell>
                <TableCell><strong>Movie</strong></TableCell>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell align="center"><strong>Rating</strong></TableCell>
                <TableCell><strong>Review</strong></TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {userReviews.map((review, index) => (
                <TableRow key={`${review.movieId}-${index}`}>
                  <TableCell>{new Date(review.createdAt).toLocaleDateString()}</TableCell>

                  {/* Movie Poster */}
                  <TableCell>
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : movies[review.movieId] ? (
                      <Avatar
                        src={
                          movies[review.movieId].poster_path
                            ? `https://image.tmdb.org/t/p/w200${movies[review.movieId].poster_path}`
                            : "/placeholder-poster.jpg"
                        }
                        alt={movies[review.movieId].title}
                        variant="rounded"
                        sx={{ width: 50, height: 75 }}
                      />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No Image
                      </Typography>
                    )}
                  </TableCell>

                  {/* Movie Title */}
                  <TableCell>
                    {loading ? "Loading..." : movies[review.movieId]?.title || review.title || "Unknown Title"}
                  </TableCell>

                  {/* Rating */}
                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold">
                      {review.rating} / 10
                    </Typography>
                  </TableCell>

                  {/* Review Text */}
                  <TableCell>{review.reviewText}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography color="textSecondary">You haven't reviewed any movies yet.</Typography>
      )}
    </Box>
  );

};

export default ReviewItems;
