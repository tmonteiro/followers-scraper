import { useContext } from 'react';
import { distanceInWords } from 'date-fns';
import { ScrapeContext } from './ScrapeContext';

function Data() {
  var { scrapes, fetchScrapes } = useContext(ScrapeContext);
  return (
    <div>
      <h2>Twitter:</h2>
      <ul>
        {scrapes.twitter.map(scrape => (
          <li key={scrape.date}>
            <span>{scrape.count} - </span>
            <span>{distanceInWords(new Date(scrape.date), new Date())}</span>
          </li>
        ))}
      </ul>
      <h2>Instagram:</h2>
      <ul>
        {scrapes.instagram.map(scrape => (
          <li key={scrape.date}>
            <span>{scrape.count} - </span>
            <span>{distanceInWords(new Date(scrape.date), new Date())}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Data;
