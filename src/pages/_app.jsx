"use client";
import { AuthContextProvider } from '@/context/authprovider';
import '@/app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
    <AuthContextProvider>
     
     
      <Component {...pageProps} />
       </AuthContextProvider>
    </div>
   
  )
}
export default MyApp;