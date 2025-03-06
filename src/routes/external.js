const express = require("express");
const axios = require("axios");

const router = express.Router();


router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
        params: { api_key: process.env.TMDB_API_KEY }
      });
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;