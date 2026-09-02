const express = require('express');
const app = express();

app.get('/crash', (req, res)=> {
  throw new error('Boom');
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});


module.exports = app;