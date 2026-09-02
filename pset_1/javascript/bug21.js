const express = require('express');
const app = express();

function getUserById(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: 'Alice' }), 10);
  });
}

app.get('/users/:id', async (req, res) => {
  const user = getUserById(Number(req.params.id));
  res.json(user);
});

module.exports = app;