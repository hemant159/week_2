const express = require('express');
const app = express();

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); ///call next() to pass control to the next middleware function
}
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use(logger);

app.get('/ping', (req, res, ) => {
  res.json({ message: 'pong' });
});

module.exports = app;