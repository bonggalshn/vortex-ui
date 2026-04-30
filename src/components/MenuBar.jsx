import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './MenuBar.css';

export default function MenuBar() {
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

  return (
    <nav className="menu-bar">
      <div className="menu-left">
        <a href="/" className="menu-item">Home</a>
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
                <button onClick={logout} className="dropdown-item">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="auth-button">Login</button>
            <button className="auth-button signup">Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}