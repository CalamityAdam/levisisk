import Head from 'next/head';
import { useState } from 'react';
import { useAuth, useFirestore } from '../services/firebase';
import { Button } from 'antd';
import styles from '../styles/Home.module.css';
import PhotoGrid from '../components/PhotoGrid';
import UploadPhotos from '../components/UploadPhotos';

export default function Home() {
  const auth = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Levi Sisk</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {auth.user ? (
          <>
            {/* authenticated */}
            <h1>SIGNED IN!!!</h1>
            <button type='primary' onClick={() => auth.signOut()}>
              Sign Out
            </button>
            <UploadPhotos />
          </>
        ) : (
          <>
            {/* unauthenticated */}
            <h1>who r u?</h1>
            <button
              type='primary'
              onClick={() => auth.signIn('poop@poop.com', 'test123ABC!')}
            >
              Sign In
            </button>
          </>
        )}

        <PhotoGrid />
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
