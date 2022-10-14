import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/index.css';

function MyAp({ Component, pageProps }: AppProps) {
  const [isSSR , setSSR] = useState(true)
  useEffect(() => {
    setSSR(false)
  } , [])
  if(isSSR) return null
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID} >
      <div>
        <Navbar />
        <div className='flex gap-6 md:gap-20' >
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1' >
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default MyAp;
