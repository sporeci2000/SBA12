const axios = require('axios');

const OMDB_BASE_URL = 'http://www.omdbapi.com/';

// Helper to call OMDb with params
const omdb = axios.create({
  baseURL: OMDB_BASE_URL,
  timeout: 10_000
});

// GET /api/search?title=...
async function searchMovies(req, res) {
  const { title } = req.query;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title query parameter is required' });
  }

  try {
    const { data } = await omdb.get('/', {
      params: {
        s: title.trim(),
        apikey: process.env.OMDB_API_KEY
      }
    });

    // OMDb signals failures with Response: "False"
    if (data?.Response === 'False') {
      return res.status(404).json({ error: data?.Error || 'No results found' });
    }

    // Cleaned-up results (camelCased and minimal fields)
    const results = (data.Search || []).map(({ Title, Year, imdbID, Type, Poster }) => ({
      title: Title,
      year: Year,
      imdbID,
      type: Type,
      poster: Poster
    }));

    return res.json({
      totalResults: Number(data.totalResults) || results.length,
      results
    });
  } catch (err) {
    console.error('OMDb search error:', err.message);
    return res.status(502).json({ error: 'Upstream service error' });
  }
}

// GET /api/movies/:id
async function getMovieDetails(req, res) {
  const { id } = req.params;

  if (!id || !id.trim()) {
    return res.status(400).json({ error: 'Movie ID (imdbID) is required' });
  }

  try {
    const { data } = await omdb.get('/', {
      params: {
        i: id.trim(),
        apikey: process.env.OMDB_API_KEY,
        plot: 'full' // nice to have: full plot
      }
    });

    if (data?.Response === 'False') {
      return res.status(404).json({ error: data?.Error || 'Movie not found' });
    }

    // You can pass through the full OMDb payload,
    // or pick fields. For now, pass through.
    return res.json(data);
  } catch (err) {
    console.error('OMDb details error:', err.message);
    return res.status(502).json({ error: 'Upstream service error' });
  }
}

module.exports = { searchMovies, getMovieDetails };
