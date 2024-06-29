"use client";
import { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { supabase } from '@/utils/Supabase'; // Importa directamente el cliente de Supabase
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

  // Al cargar el componente, intenta obtener el usuario desde localStorage si está disponible
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
      const userFromDB = await getUserByEmail(email); // Obtener datos completos del usuario por email
      setUser(userFromDB.name); // Establecer el nombre del usuario en el estado
      localStorage.setItem('supabaseUser', JSON.stringify(userFromDB.name)); // Guardar el nombre del usuario en localStorage
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email, password, name) => {
    try {
      const userData = await signUpUser(email, password, name);
      const userFromDB = await getUserByEmail(email); // Obtener datos completos del usuario por email
      setUser(userFromDB.name); // Establecer el nombre del usuario en el estado
      localStorage.setItem('supabaseUser', JSON.stringify(userFromDB.name)); // Guardar el nombre del usuario en localStorage
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('supabaseUser'); // Remover el usuario de localStorage al cerrar sesión
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
