import { ScrapeProvider } from './ScrapeContext';

function Page({ children }) {
  return (
    <ScrapeProvider value={{ name: 'Paul', surname: 'Walker' }}>
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
}

export default Page;
