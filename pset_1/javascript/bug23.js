// const express = require('express');
// const app = express();

// function getUserName(id) {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(`User${id}`), 10);
//   });
// }

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// app.get('/names', async (req, res) => {
//   const ids = [1, 2, 3];
//   const names = ids.map(async (id) => await getUserName(id));
//   res.json({ names });
   
// });

// module.exports = app;

const express = require('express');
const app = express();
function getUserName(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`User${id}`), 10);
  });
}
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.get('/names', async (req, res) => {
  const ids = [1, 2, 3];
  const names = await Promise.all(ids.map(async (id) => await getUserName(id))); ///await promise.all to wait for all promises to resolve
  res.json({ names });
}); 
module.exports = app;