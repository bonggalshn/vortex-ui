import { createContext, useContext, useState } from 'react';
import { register as registerApi, login as loginApi } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const data = await loginApi({ username, password });
    setUser({ username, token: data.token });
    return data;
  };

  const register = async (userData) => {
    return await registerApi(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}