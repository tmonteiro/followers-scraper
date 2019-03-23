import { useState, useEffect } from 'react';
import { ScrapeProvider } from './ScrapeContext';

function useScrapes() {
  const [scrapes, setScrapes] = useState({
    twitter: [],
    instagram: [],
  });

  const fetchScrapes = async () => {
    const res = await fetch('http://localhost:2090/data');
    const data = await res.json();
    setScrapes(data);
  };

  useEffect(() => {
    fetchScrapes();
  }, []);

  return { scrapes, fetchScrapes };
}

function Page({ children }) {
  const scrapes = useScrapes();
  return (
    <ScrapeProvider value={scrapes}>
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
}

export default Page;
