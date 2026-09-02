const express = require('express');
const app = express();

function findUser(id) {
  return new Promise((resolve, reject) => {
    if (id === 1) resolve({ id: 1, name: 'Alice' });
    else reject(new Error('User not found'));
  });
}
app.listen(3000, () => {
  console.log('Server is running on port 3000');     // serverport missing
});

app.get('/users/:id', async (req, res) => {
  const user = await findUser(Number(req.params.id));
  res.json(user);
});

module.exports = app;