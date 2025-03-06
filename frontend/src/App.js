import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieSearchPage from './pages/MovieSearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import PrivateRoute from './components/auth/PrivateRoute';
import TrendingMovies from './components/movies/TrendingMovie';
import UserReviewPage from './pages/UserReviewPage';
import MovieChoicePage from "./pages/MovieChoicePage";
import MovieReviewPage from './pages/MovieReviewPage';

import { Box, Container, CssBaseline, Grid } from "@mui/material";

const drawerWidth = 200; // Width of the sidebar when expanded

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle sidebar
  return (
    <AuthProvider>
      <CssBaseline /> {/* Normalize styles for a clean UI */}
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar Navigation (Navbar) */}
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content Area (Adjusted based on Navbar width) */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
            width: `calc(100% - ${isSidebarOpen ? drawerWidth: 60 }px)`, // Adjust width based on sidebar state
            transition: " 0.3s ease-in-out",
            p: 4,
          }}
        >
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/search" element={<MovieSearchPage />} />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
              <Route path="/my-reviews" element={<UserReviewPage />}>
                <Route path="movie_search" element={<MovieChoicePage />} />
                <Route path="write_review/:id" element={<MovieReviewPage />} />
              </Route>
            </Routes>
          </Container>

          {/* Sticky Footer */}
          <Footer sx={{ mt: "auto" }} />
        </Box>
      </Box>
    </AuthProvider>
    
  );
}

export default App;