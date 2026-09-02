import express from 'express';
import type { Request, Response } from 'express';
const app = express();

interface User {
  id: number;
  name: string;
}

function getUserById(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: 'Alice' }), 10);
  });
}

async function loadUser(id: number): Promise<User> {
  const user = await getUserById(id);
  return user;
}

app.get('/users/:id', async (req: Request, res: Response) => {
  const user = await loadUser(Number(req.params.id));  //use await promise to get the user object
  res.json(user);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


export default app;