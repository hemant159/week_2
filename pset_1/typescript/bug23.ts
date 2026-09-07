import express from 'express';
import type { Request, Response ,NextFunction } from 'express';
const app = express();

function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`);
  next();
}

app.use(logger);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'pong' });
});


export default app;