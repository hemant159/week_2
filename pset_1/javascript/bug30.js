const express = require('express');
const app = express();

function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401);
  }
  next();
}

app.get('/protected', requireAuth, (req, res) => {
  res.json({ message: 'secret data' });
});

module.exports = app;