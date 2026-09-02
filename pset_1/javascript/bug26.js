const express = require('express');
const app = express();

function checkBody(req, res, next) {
  if (!req.body || !req.body.name) {
    return next(new Error('Name is required'));
  }
  next();
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/users', checkBody, (req, res) => {
  res.status(201).json({ message: 'Created' });
});

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

app.listen(3000, () => {
  console.log('Bug26 running on port 3000');
});

module.exports = app;