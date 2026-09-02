const express = require('express');
const app = express();

app.get('/crash', (req, res) => {
  throw new Error('Something broke');
});

app.use((err, req, res) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;