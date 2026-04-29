import React, { useState, useEffect } from 'react';

/**
 * API endpoint for fetching quote data.
 * @constant {string}
 */
const API_URL = 'https://vortex-engine.onrender.com/main';

/**
 * App component - Main application container.
 * Displays VORTEX title and fetches dynamic quote from API.
 * @returns {JSX.Element}
 */
function App() {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  /**
   * Fetches quote data from the VORTEX API.
   * Updates state based on API response.
   * @async
   * @returns {Promise<void>}
   */
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
    <div className="app-container">
      <h1 className="title">VORTEX</h1>
      {!isLoading && !hasError && quote && (
        <div className="quote-container">
          <p className="quote-text">{quote}</p>
        </div>
      )}
    </div>
  );
}

export default App;