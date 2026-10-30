'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ ok: boolean }>;
  register: (input: { name: string; email: string; phone?: string; password: string }) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => void;
  updateProfile: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err.response?.data?.message || 'Login failed' };
    }
  };

  const signInWithGoogle = async () => {
    return { ok: false };
  };

  const register = async ({ name, email, phone, password }: any) => {
    try {
      const res = await api.post('/auth/register', { name, email, phone, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err.response?.data?.message || 'Registration failed' };
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = (patch: Partial<User>) => {
    if (!user) return;
    const newUser = { ...user, ...patch };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGoogle, register, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
