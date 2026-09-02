const express = require('express');
const app = express();

app.get('/crash', (req, res) => {
  throw new Error('Something broke');
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
  next(err);             // next(err) is used to pass the error to the next error-handling middleware in the stack
});

app.listen(3000, () => {  
  console.log('Server is running on port 3000');
});

module.exports = app;