const express = require('express');

// Importing controller functions
const { searchMovies, getMovieDetails } = require('../controllers/movieController');

// Create a router instance
const router = express.Router();

// Connect it to the searchMovies controller function
router.get('/search', searchMovies);

// Connect it to the getMovieDetails controller function
router.get('/movies/:id', getMovieDetails);

// Export the router so it can be mounted in server.js
module.exports = router;
