
import express from 'express';
import cors from 'cors';
import { prisma } from './db';

const app = express();
app.use(cors());
app.use(express.json());

// Event query endpoints
app.get('/events/hero/hero-event', async (req, res) => {
      try {
        const events = await prisma.heroEvent.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch hero-HeroEvent:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

app.get('/events/hero/take-fees-event', async (req, res) => {
      try {
        const events = await prisma.takeFeesEvent.findMany();
        res.json(events);
      } catch (error) {
        console.error('Failed to fetch hero-TakeFeesEvent:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
