import express from 'express';
import { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the server!' });
});
app.get('/api/test', (req: Request, res: Response) => {
   res.json({ message: 'Test endpoint is working!' });
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
