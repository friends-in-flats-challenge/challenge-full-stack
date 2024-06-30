"use client";
import '@/app/globals.css';
import Login from '@/app/components/routes-login-sign-up/Login'; 
import Header from '@/app/components/Header';
const LoginPage = () => {
  return (
    <div>
      <Header/>
      <Login />
      </div>
  );
};

export default LoginPage;
