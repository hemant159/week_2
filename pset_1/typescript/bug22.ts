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

app.get('/users/:id', async (req: Request, res: Response) => {
    const user: User = await getUserById(Number(req.params.id)); //use await promise to get the user object
  res.json({ name: user.name });
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
export default app;