const express = require('express');
const app = express();

function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
   return res.status(401).json({error:unauthorized});
  }
  next();
}

app.get('/protected', requireAuth, (req, res) => {
  res.json({ message: 'secret data' });
});

module.exports = app;