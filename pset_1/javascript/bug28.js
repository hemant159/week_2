const express = require('express');
const app = express();



app.get('/crash', (req, res) => {             // first crash route to throw an error
  throw new Error('Boom');
});
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
  next(err);                         //call next(err) to pass the error to the next error-handling middleware in the stack
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;