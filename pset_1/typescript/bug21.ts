import express, { Request, Response } from 'express';
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

async function loadUser(id: number): User {
  const user = await getUserById(id);
  return user;
}

app.get('/users/:id', async (req: Request, res: Response) => {
  const user = await loadUser(Number(req.params.id));
  res.json(user);
});

export default app;