require('dotenv').config();
const express = require('express');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = 3004;

app.get('/', (_req, res) => {
    res.json({ status: 'ok', service: 'Movie Finder API' });
});

app.use('/api', movieRoutes);

app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});