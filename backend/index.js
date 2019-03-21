import express from 'express';
import { getTwitterCount, getInstagramCount } from './lib/scraper';

const app = express();
const port = 2090;

app.get('/scrape', async (req, res, next) => {
  console.log('scraping...');
  const [tCount, iCount] = await Promise.all([
    getTwitterCount(),
    getInstagramCount(),
  ]);
  res.json({ Twitter: tCount, Instagram: iCount });
  console.log('done...');
});

app.listen(port, () => `Server running on port ${port}`);
