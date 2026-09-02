import express, { Request, Response, NextFunction } from 'express';
const app = express();

function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`);
}

app.use(logger);

app.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'pong' });
});

export default app;