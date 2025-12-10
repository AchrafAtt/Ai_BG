import express from 'express';
import { Request, Response } from 'express';
import { disposeEmitNodes } from 'typescript';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the server!' });
});

app.get('/api/test', (req: Request, res: Response) => {
   res.json({ message: 'Test endpoint is working!' });
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const { prompt } = req.body;
   const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      temperature: 0.4,
      max_output_tokens: 100,
   });
   res.json({ message: response.output_text });
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
