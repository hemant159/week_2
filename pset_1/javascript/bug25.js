const express = require('express');
const app = express();

function requireApiKey(req, res, next) {
  if (req.headers['x-api-key'] !== 'secret123') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/private-data', requireApiKey, (req, res) => {
  res.json({ secret: 'top secret info' });
});

app.listen(3000, () => {
  // console.log('Bug25 running on port 3000');
   console.log('Bug25 running on port 3000');
});

module.exports = app;