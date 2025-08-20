// It loads the variables from .env into Node's process.env object
require('dotenv').config();

// Set up Express app
const express = require('express');

// Import routes
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 3004;

// Mount movie routes under /api
app.use('/api', movieRoutes);

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Server listens on a port and logs startup
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});