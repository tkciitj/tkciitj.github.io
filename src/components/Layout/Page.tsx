import {NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {memo, PropsWithChildren} from 'react';

import {HomepageMeta} from '../../data/dataDef';

const Page: NextPage<PropsWithChildren<HomepageMeta>> = memo(({children, title, description}) => {
  const {asPath: pathname} = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <link href={`https://reactresume.com${pathname}`} rel="canonical" />
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <link href="/icon.svg" rel="icon" type="image/svg+xml" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
        <link href="/site.webmanifest" rel="manifest" />
        <meta content={title} property="og:title" />
        <meta content={description} property="og:description" />
        <meta content={`https://reactresume.com${pathname}`} property="og:url" />
        <meta content={title} name="twitter:title" />
        <meta content={description} name="twitter:description" />
      </Head>

      {/* Full viewport dark background */}
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Grid overlay */}
        <div
          className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
                                           linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
                       bg-[size:20px_20px] pointer-events-none z-0"
        />

        {/* Centered content */}
        <main className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-4xl">{children}</div>
        </main>
      </div>
    </>
  );
});

Page.displayName = 'Page';
export default Page;
