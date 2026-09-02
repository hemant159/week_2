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

app.get('/users/:id', async (req: Request, res: Response) => {
    const user: User = getUserById(Number(req.params.id));
  res.json({ name: user.name });
});

export default app;