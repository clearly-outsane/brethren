/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unused-imports/no-unused-vars */
import dynamic from 'next/dynamic';
import * as React from 'react';
import { useWindowSize } from 'react-use';

import useBoundStore from '@/lib/store';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const WebGL = dynamic(
  () => import('@/components/canvas/work').then((WebGL) => WebGL),
  { ssr: false }
);

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const { height: windowHeight } = useWindowSize();
  const addThreshold = useBoundStore(({ addThreshold }) => addThreshold);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <div className='fixed top-0 left-0 bottom-0 right-0'>
        <WebGL />
      </div>
      <main className='bg-black'>
        <section className='relative text-white'>
          <div className='container mx-auto flex min-h-screen flex-col items-center justify-center px-5 lg:px-0'>
            <h1
              className='max-w-[924px] text-center'
              style={
                {
                  '--max': '90px',
                  '--val': '8vw',
                  '--min': '40px',
                } as React.CSSProperties
              }
            >
              Where Strategy & Tactics Meet
            </h1>
          </div>
        </section>
      </main>
    </Layout>
  );
}
