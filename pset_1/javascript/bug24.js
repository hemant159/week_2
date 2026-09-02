const express = require('express');
const app = express();

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.listen(3000, () => {
  console.log('Bug24 running on port 3000');
});

module.exports = app;