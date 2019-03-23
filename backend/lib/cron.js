import cron from 'node-cron';
import { runCron } from './scraper';

cron.schedule('30 * * * *', () => {
  console.log('Running the Cron...');
  runCron();
});
