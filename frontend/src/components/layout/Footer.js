import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.dark",
        color: "white",
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between" alignItems="center">
          {/* Left Section - App Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Movie Review App
            </Typography>
            <Typography variant="body2" color="gray">
              Keep track of your movie experiences
            </Typography>
          </Grid>

          {/* Right Section - Copyright */}
          <Grid item xs={12} md="auto" textAlign={{ xs: "center", md: "right" }}>
            <Typography variant="body2">© {currentYear} Movie Review App</Typography>
            <Typography variant="caption" color="gray">
              Powered by TMDB API
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
