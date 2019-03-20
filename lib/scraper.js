import axios from 'axios';
import cheerio from 'cheerio';

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

export { getHtml, getTwitterFollowers, getInstagramFollowers };
