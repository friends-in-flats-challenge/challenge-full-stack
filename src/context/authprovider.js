"use client";
import { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { supabase } from '@/utils/Supabase'; 
import { signInUser, signUpUser, getUserByEmail } from '@/utils/database';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  signUp: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  
  useEffect(() => {
    const storedUser = localStorage.getItem('supabaseUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setAuthReady(true);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const userData = await signInUser(email, password);
      const userFromDB = await getUserByEmail(email); 
      setUser(userFromDB.name); 
      localStorage.setItem('supabaseUser', JSON.stringify(userFromDB.name)); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email, password, name) => {
    try {
      const userData = await signUpUser(email, password, name);
      const userFromDB = await getUserByEmail(email); 
      setUser(userFromDB.name); 
      localStorage.setItem('supabaseUser', JSON.stringify(userFromDB.name)); 
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('supabaseUser'); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
      throw error;
    }
  }, []);

  const contextValues = useMemo(() => ({
    user,
    login,
    signUp,
    logout,
    authReady,
  }), [user, login, signUp, logout, authReady]);

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
