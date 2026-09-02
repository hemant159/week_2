const express = require('express');
const app = express();

function getUserName(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`User${id}`), 10);
  });
}

app.get('/names', async (req, res) => {
  const ids = [1, 2, 3];
  const names = ids.map(async (id) => await getUserName(id));
  res.json({ names });
});

module.exports = app;