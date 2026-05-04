import { useState } from 'react';
import { register } from '../api/auth';
import './Register.css';

export default function Register({ navigate }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setError('Username, password, and confirm password are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      navigate('login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">VORTEX</h1>
        <h2 className="register-subtitle">Register</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} required className="form-input" placeholder="Enter your username" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required className="form-input" placeholder="Enter your password" />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Re-enter Password *</label>
            <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="form-input" placeholder="Re-enter your password" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email (Optional)</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="Enter your email (optional)" />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="register-footer">
          <button onClick={() => navigate('login')} className="login-link">Already have an account? Login</button>
        </div>
      </div>
    </div>
  );
}
