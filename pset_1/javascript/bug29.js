const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const SIGNING_SECRET = 'super-secret-key';

app.get('/token', (req, res) => {
  const token = jwt.sign({ userId: 1 }, SIGNING_SECRET);
  res.json({ token });
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization;
  try {
    const payload = jwt.verify(token, 'wrong-secret-key');
    res.json({ userId: payload.userId });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = app;