import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import '../styles/index.css';

function MyAp({ Component, pageProps }: AppProps) {
  const [isSSR , setSSR] = useState(true)
  useEffect(() => {
    setSSR(false)
  } , [])
  if(isSSR) return null
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID} >
        <Head>
          <title>Blog</title>
          <meta name='viewport' content='initial-scale=1.0 , width=device-width' />
          <link rel="icon" href='/logo.png' type='image/png' />
        </Head>
        <div className='h-screen overflow-hidden' >
          <Navbar />
          <div className='flex h-screen md:gap-20' >
            <div className='fixed left-0 top-0 w-[50vw] md:absolute md:w-auto xl:static z-50'>
              <Sidebar />
            </div>
            <div className='mt-4 mx-5 md:mx-10 flex flex-col gap-10 h-[88vh] videos flex-1' >
              <Component {...pageProps} />
            </div>
          </div>
        </div>
    </GoogleOAuthProvider>
  );
}

export default MyAp;
