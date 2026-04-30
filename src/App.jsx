import { useState, useEffect } from 'react';
import MenuBar from './components/MenuBar';

const API_URL = 'https://vortex-engine.onrender.com/main';

function App() {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.responseMessage) {
          setQuote(data.responseMessage);
        }
      } catch (error) {
        console.error('Failed to fetch quote:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <>
      <MenuBar />
      <div className="app-container">
        <h1 className="title">VORTEX</h1>
        {!isLoading && !hasError && quote && (
          <div className="quote-container">
            <p className="quote-text">{quote}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;