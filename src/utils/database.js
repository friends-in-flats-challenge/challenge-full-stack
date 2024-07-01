
import { supabase } from './Supabase';

export const signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
    return data.user;
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw error;
  }
};

export const signUpUser = async (email, password, name) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw error;
    }

    const { data: insertData, error: insertError } = await supabase
      .from('Users')
      .insert([{ id: data.user.id, email, name, created_at: new Date() }]);
    if (insertError) {
      throw insertError;
    }
    console.log('User registered successfully:', insertData);
    return insertData;
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw error;
  }
};

export const checkSession = async () => {
  try {
    const user = supabase.auth.user();
    return user;
  } catch (error) {
    console.error('Error checking session:', error.message);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('Users')
      .select('*');
    if (error) {
      throw error;
    }
    console.log('User data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

export const sendOtp = async (email) => {
  try {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error sending OTP email:', error.message);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('Users')
      .select('name, email')
      .eq('email', email)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching user by email:', error.message);
    throw error;
  }
};

export default {
  signInUser,
  signUpUser,
  checkSession,
  getUsers,
  sendOtp,
  getUserByEmail,
};
