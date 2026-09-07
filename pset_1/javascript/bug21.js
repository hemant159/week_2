
const express = require('express');
const app = express();

function getUserById(id) {  
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: 'Alice' }), 10);
  });
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/users/:id', async (req, res) => {
  const user = await getUserById(Number(req.params.id));   //await missing as we use async function
  res.json(user);
});
module.exports = app;
