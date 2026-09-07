const express = require('express');
const app = express();

function checkBody(req, res, next) {
  console.log(req.body);//checking the middleware calling or not
  if (!req.body || !req.body.name) {
    return next(new Error('Name is required'));
  }
  next();
}

app.use(express.json());

app.post('/users', checkBody, (req, res) => {
  res.status(201).json({ message: 'Created' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');// port number added to the console log to check the server is running or not
});

module.exports = app;