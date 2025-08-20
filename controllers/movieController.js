// Import axios to make HTTP requests to the OMDb API
const axios = require('axios');

// Base URL of the OMDb API
const OMDB_BASE_URL = 'http://www.omdbapi.com/';


async function searchMovies(req, res) {
    // Extract the 'title' query parameter from the request
    const { title } = req.query;

    // Validate that a title was provided
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        // Make a GET request to the OMDb API with search term and API key
        const response = await axios.get(OMDB_BASE_URL, {
            params: {
                s: title,
                apikey: process.env.OMDB_API_KEY
            }
        });

        // Send OMDb’s response data directly back to the client
        res.json(response.data);
    } catch (err) {
        console.error('OMDb search error:', err.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}


async function getMovieDetails(req, res) {

    // Extract the 'id' route parameter 
    const { id } = req.params;

    try {
        // Make a GET request to the OMDb API with movie ID and API key
        const response = await axios.get(OMDB_BASE_URL, {
            params: {
                i: id,
                apikey: process.env.OMDB_API_KEY
            }
        });

        res.json(response.data);
    } catch (err) {
        console.error('OMDb details error:', err.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

// Export controller functions 
module.exports = { searchMovies, getMovieDetails };
