const express = require("express");
const axios = require("axios");

const router = express.Router();

// Fetch movie details from TMDB
router.post("/search", async (req, res) => {
  try {
    const { title } = req.body;

    // Validate that title is provided
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: "Title is required and must be a non-empty string" });
    }

    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: { api_key: process.env.TMDB_API_KEY, query: title.trim() }
    });

    if (response.data.results.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(response.data.results.slice(0,10)); // Return the first matching movie using [0]
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch movie details by ID
router.get("/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that ID is provided and is a number
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Valid movie ID is required" });
    }

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: { api_key: process.env.TMDB_API_KEY },
    });

    res.json(response.data);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
