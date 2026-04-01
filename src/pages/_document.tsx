import {Head, Html, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html className="h-full" lang="en">
      <Head>
        <style>{`
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #000000; /* pure black */
            background-image:
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 20px 20px; /* compact grid */
            background-repeat: repeat;
            background-attachment: fixed;
            background-position: 0 0;
            color: #e5e5e5; /* light text */
          }
        `}</style>
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
