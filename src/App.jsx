import { useState } from 'react';
import MenuBar from './components/MenuBar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

function Home() {
  return (
    <div className="app-container">
      <h1 className="title">VORTEX</h1>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('home');

  const navigate = (pageName) => {
    setPage(pageName);
  };

  return (
    <AuthProvider>
      <MenuBar navigate={navigate} />
      {page === 'home' && <Home />}
      {page === 'register' && <Register navigate={navigate} />}
      {page === 'login' && <Login navigate={navigate} />}
      <Footer />
    </AuthProvider>
  );
}

export default App;