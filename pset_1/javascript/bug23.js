const express = require('express');
const app = express();

function getUserName(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`User${id}`), 10);
  });
}

app.get('/names', async (req, res) => {
  const ids = [1, 2, 3];
  const names = await promiseHooks.all(        //await promiseHook.all() added
  ids.map((id) => getUserName(id))              // delete async 
  );
  res.json({ names });
});

module.exports = app;