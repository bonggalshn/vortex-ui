import { useState, useEffect } from 'react';

import MenuBar from './components/MenuBar';
import Footer from './components/Footer';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const API_URL = 'https://vortex-engine.onrender.com/main';

function App() {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
      <MenuBar onShowRegister={() => setShowRegister(true)} onShowLogin={() => setShowLogin(true)} />
      <div className="app-container">
        <h1 className="title">VORTEX</h1>
        {showLogin ? (
          <LoginForm
            onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
            onClose={() => setShowLogin(false)}
          />
        ) : showRegister ? (
          <RegisterForm
            onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
          />
        ) : (
          !isLoading && !hasError && quote && (
            <div className="quote-container">
              <p className="quote-text">{quote}</p>
            </div>
          )
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;