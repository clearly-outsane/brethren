import dynamic from 'next/dynamic';
import * as React from 'react';
import { BsArrowDown } from 'react-icons/bs';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const WebGL = dynamic(
  () => import('@/components/canvas/home').then((WebGL) => WebGL),
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
  const WhatWeDoCard = ({
    title,
    number,
    content,
  }: {
    title: string;
    number: string;
    content: string;
  }) => {
    return (
      <div className='flex w-full max-w-[436px] flex-col bg-black py-6 px-8'>
        <div className='flex w-full justify-between'>
          <div className='bold text-[16px]'>{title}</div>
          <div className='text[18px]'>{number}</div>
        </div>
        <div className='mt-6 text-[16px] text-[#797A7D]'>{content}</div>
      </div>
    );
  };

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
            <h1 className='grid flex-1 place-items-center self-end text-center lg:max-w-[546px] lg:text-left'>
              We help you grow your business by creating an experience that
              people love.
            </h1>
            <div className='absolute bottom-0 mb-10 flex flex-col items-center'>
              <span className='mb-10'>Keep exploring</span>
              <BsArrowDown size={24} />
            </div>
          </div>
        </section>

        <section className='relative text-white'>
          <div className='container mx-auto flex min-h-screen flex-col items-center justify-center px-5 lg:items-start lg:px-0'>
            <span className='text-[12px] uppercase tracking-[0.2em] lg:text-[14px]'>
              Branding + digital
            </span>
            <h2 className='mt-5 max-w-[546px] text-center lg:text-left'>
              Brethren is a branding and digital design agency.
            </h2>
            <div className='mt-16 grid grid-cols-1 gap-6 lg:w-[75%] lg:grid-cols-2'>
              <WhatWeDoCard
                title='Refine'
                number='01'
                content='Unifying your brand experience'
              />
              <WhatWeDoCard
                title='Relevance'
                number='02'
                content='Connecting you with your customers'
              />
              <WhatWeDoCard
                title='Ingenuity'
                number='03'
                content='Solving business problems with digital'
              />
              <WhatWeDoCard
                title='Collaboration'
                number='04'
                content='Partnering to accomplish long-term goalss'
              />
            </div>
            <span className='mt-12'>Plan a Project</span>
          </div>
        </section>
      </main>
    </Layout>
  );
}
