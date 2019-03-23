import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';

function Data() {
  const scrapeData = useContext(ScrapeContext);
  return (
    <div>
      <h2>Your data:</h2>
      <p>{scrapeData.name}</p>
      <p>{scrapeData.surname}</p>
    </div>
  );
}

export default Data;
