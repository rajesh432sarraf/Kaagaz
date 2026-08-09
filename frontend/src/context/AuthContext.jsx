import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getMe } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until we've checked token

  // On mount, restore session from localStorage
  useEffect(() => {
    const token = localStorage.getItem('kaagaz_token');
    if (token) {
      getMe()
        .then(data => setUser(data.user))
        .catch(() => {
          localStorage.removeItem('kaagaz_token');
          localStorage.removeItem('kaagaz_user');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    localStorage.setItem('kaagaz_token', data.token);
    localStorage.setItem('kaagaz_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await registerUser({ name, email, password });
    localStorage.setItem('kaagaz_token', data.token);
    localStorage.setItem('kaagaz_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('kaagaz_token');
    localStorage.removeItem('kaagaz_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
