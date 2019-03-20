import {
  getHtml,
  getTwitterFollowers,
  getInstagramFollowers,
} from './lib/scraper';

async function go() {
  const twPromise = getHtml('https://twitter.com/kofdadepressao');
  const instPromise = getHtml('https://www.instagram.com/kofdadepressao/');

  const [twHtml, instHtml] = await Promise.all([twPromise, instPromise]);

  const twCount = await getTwitterFollowers(twHtml);
  const instCount = await getInstagramFollowers(instHtml);
  console.log('Twitter Followers: ', twCount);
  console.log('Instagram Followers: ', instCount);
}

go();
