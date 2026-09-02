const express = require('express');
const app = express();

app.get('/crash', (req, res) => {
  throw new Error('Boom');
});

// Error handlers must be registered LAST, after all routes
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;