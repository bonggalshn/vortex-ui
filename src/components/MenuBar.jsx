import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './MenuBar.css';

export default function MenuBar({ navigate }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('home');
  };

  return (
    <nav className="menu-bar">
      <div className="menu-left">
        <button onClick={() => navigate('home')} className="menu-item">Home</button>
      </div>
      <div className="menu-right">
        {user ? (
          <div className="user-menu" ref={dropdownRef}>
            <button
              className="user-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Hi, {user.username}
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout} className="dropdown-item">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={() => navigate('login')} className="auth-button">Login</button>
            <button onClick={() => navigate('register')} className="auth-button signup">Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}