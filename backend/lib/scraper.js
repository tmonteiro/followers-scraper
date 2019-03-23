import axios from 'axios';
import cheerio from 'cheerio';
import db from './db';

async function getHtml(url) {
  const { data: html } = await axios.get(url);
  return html;
}

async function getTwitterFollowers(html) {
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');
  return span.data('count');
}

async function getInstagramFollowers(html) {
  const $ = cheerio.load(html);
  const dataInString = $('script[type="application/ld+json"]').html();
  const json = JSON.parse(dataInString);
  return parseInt(
    json.mainEntityofPage.interactionStatistic.userInteractionCount
  );
}

async function getTwitterCount() {
  const html = await getHtml('https://twitter.com/kofdadepressao');
  const count = await getTwitterFollowers(html);
  return count;
}

async function getInstagramCount() {
  const html = await getHtml('https://www.instagram.com/kofdadepressao/');
  const count = await getInstagramFollowers(html);
  return count;
}

async function runCron() {
  const [tCount, iCount] = await Promise.all([
    getTwitterCount(),
    getInstagramCount(),
  ]);

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

  console.log('Done.');
}

function getDbData() {
  return db.value();
}

export { getTwitterCount, getInstagramCount, runCron, getDbData };
