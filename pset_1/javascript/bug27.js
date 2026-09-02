const express = require('express');
const app = express();

app.get('/crash', (req, res) => {
  throw new Error('Something broke');
});

// Error-handling middleware MUST have 4 parameters
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;