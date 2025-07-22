import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from Docker + Express!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});