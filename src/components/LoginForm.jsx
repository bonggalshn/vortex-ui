import './LoginForm.css';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginForm({ onSwitchToRegister, onClose }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!form.username || !form.password) {
        setError('Username and password are required');
        return;
      }
      await login(form.username, form.password);
      onClose();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username *</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <span className="error">{error}</span>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <p className="switch-form">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchToRegister}>
            Register
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;