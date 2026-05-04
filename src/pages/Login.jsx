import { useState } from 'react';
import { login as loginApi } from '../api/auth';
import './Login.css';

export default function Login({ navigate }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      return;
    }
    setIsLoading(true);
    try {
      await loginApi(formData);
      navigate('home');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">VORTEX</h1>
        <h2 className="login-subtitle">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} required className="form-input" placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required className="form-input" placeholder="Enter password" />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="login-footer">
          <button onClick={() => navigate('register')} className="register-link">Don't have an account? Register</button>
        </div>
      </div>
    </div>
  );
}
