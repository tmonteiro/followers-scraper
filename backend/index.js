import express from 'express';
import { getTwitterCount, getInstagramCount } from './lib/scraper';
import db from './lib/db';

const app = express();
const port = 2090;

app.get('/scrape', async (req, res, next) => {
  console.log('scraping...');

  const [tCount, iCount] = await Promise.all([
    getTwitterCount(),
    getInstagramCount(),
  ]);
  res.json({ Twitter: tCount, Instagram: iCount });

  db.get('twitter')
    .push({
      date: Date.now(),
      count: tCount,
    })
    .write();

  db.get('instagram')
    .push({
      date: Date.now(),
      count: iCount,
    })
    .write();

  console.log('done...');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
