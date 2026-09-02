const express = require('express');
const app = express();

function requireApiKey(req, res, next) {
  if (req.headers['x-api-key'] !== 'secret123') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.use(requireApiKey);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/private-data', (req, res) => {
  res.json({ secret: 'top secret info' });
});

module.exports = app;