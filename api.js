import axios from "axios";

// Define the API base URL
const API_URL = "http://localhost:8000/api"; // Change if using a deployed backend port

// Get Trending Movies (Example from TMDB API)
export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/external/trending`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

// Find Movie
export const findMovie = async (movieName) => {
    try{
        const response = await axios.get(
            `${API_URL}/movies/search/${movieName}`
        );
        return response.data
    }catch(error) {
        console.error("Error finding movies:", movieName)
    }
};

// Register user
export const register = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {username, email, password});
        return response.data
    } catch (error) {
        console.error("Error when register the user")
    }
};

// User Login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response.data);
    return null;
  }
};

// Fetch Movie Reviews
export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(
        `${API_URL}/reviews`, 
        { headers: { Authorization: `Bearer ${token}` }});
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return [];
  }
};

// Add a New Review
export const addReview = async (token, movieId, title, reviewText, rating) => {
  try {
    const response = await axios.post(
      `${API_URL}/reviews`,
      { movieId, title, reviewText, rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    return null;
  }
};
