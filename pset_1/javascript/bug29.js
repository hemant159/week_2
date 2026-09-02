const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const SIGNING_SECRET = 'super-secret-key';

app.get('/token', (req, res) => {
  const token = jwt.sign({ userId: 1 }, SIGNING_SECRET);
  res.json({ token });
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];          //splits separates the token from the "Bearer" prefix in the Authorization header
  try {
    const payload = jwt.verify(token, SIGNING_SECRET);           //verifies the token using the signing secret
    res.json({ message: 'Access granted', userId: payload.userId });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;