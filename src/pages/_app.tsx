import 'tailwindcss/tailwind.css';
import '../globalStyles.scss';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { memo } from 'react';

const backgroundStyle: React.CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#000000', // pure black
  backgroundImage: `
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
  `,
  backgroundSize: '20px 20px', // compact grid
  backgroundRepeat: 'repeat',
  backgroundAttachment: 'fixed',
  backgroundPosition: '0 0',
};

const MyApp = memo(({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Tushar Kant • Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Tushar Kant - Full Stack Developer and Problem Solver."
        />
      </Head>

      {/* Full-page background wrapper */}
      <div style={backgroundStyle} className="min-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  );
});

export default MyApp;
