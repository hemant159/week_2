const express = require('express');
const app = express();

function checkBody(req, res, next) {
  if (!req.body || !req.body.name) {
    return next(new Error('Name is required'));
  }
  next();
}

app.use(express.json());

app.post('/users', checkBody, (req, res) => {
  res.status(201).json({ message: 'Created' });
});

module.exports = app;