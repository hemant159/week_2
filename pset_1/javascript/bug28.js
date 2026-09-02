const express = require('express');
const app = express();

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.get('/crash', (req, res) => {
  throw new Error('Boom');
});

module.exports = app;