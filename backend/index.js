import express from 'express';
import { getTwitterCount, getInstagramCount } from './lib/scraper';
import './lib/cron';

const app = express();
const port = 2090;

app.get('/scrape', async (req, res, next) => {
  const [tCount, iCount] = await Promise.all([
    getTwitterCount(),
    getInstagramCount(),
  ]);
  res.json({ Twitter: tCount, Instagram: iCount });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
