import api from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: any | null;
  loading: boolean;
  setUser: (user: any | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    restoreSession();
    
  }, []);

  const restoreSession = async () => {
    try {      
      setLoading(true);
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        const resp = await api.get('/me');
        //console.log('User data fetched', resp.data);
        setUser(resp.data);
      }
    } catch (e: any) {
      // Only clear token on 401 (handled by interceptor already).
      // Network errors should NOT wipe a valid token.
      console.warn('Session restore failed', e);
      if (e?.response?.status === 401) {
        await AsyncStorage.removeItem('access_token');
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const resp = await api.post('/login', { email, password });
    // Expecting API to return { token, user }
    const { token, user: userData } = resp.data;    
    if (token) {
      await AsyncStorage.setItem('access_token', token);
    }
    setUser(userData ?? null);
    router.replace('/(app)');
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('access_token');
    setUser(null);
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, signIn, signOut }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
