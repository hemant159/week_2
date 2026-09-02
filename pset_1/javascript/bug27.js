const express = require('express');
const app = express();

app.get('/crash', (req, res) => {
  throw new Error('Something broke');
});

app.use((err, req, res, next) => {});     //add next

module.exports = app;