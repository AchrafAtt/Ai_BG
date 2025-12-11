import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import z from 'zod';

dotenv.config();

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long'),
   conversationId: z.string().uuid(),
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

const converations = new Map<string, string>();

app.post('/api/chat', async (req: Request, res: Response) => {
   const parseResult = chatSchema.safeParse(req.body);
   if (!parseResult.success) {
      return res.status(400).json(parseResult.error.format());
   }
   try {
      const { prompt, conversationId } = req.body;
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.4,
         max_output_tokens: 100,
         previous_response_id: converations.get(conversationId) || undefined,
      });
      converations.set(conversationId, response.id);
      res.json({ message: response.output_text, responseID: response.id });
   } catch (error) {
      res.status(500).json({
         error: 'An error occurred while processing your request.',
      });
   }
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
