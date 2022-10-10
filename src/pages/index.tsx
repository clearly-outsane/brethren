/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unused-imports/no-unused-vars */
import { useRect } from '@studio-freight/hamo';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import * as React from 'react';
import { BsArrowDown } from 'react-icons/bs';
import { useWindowSize } from 'react-use';

import useBoundStore from '@/lib/store';

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
  const { height: windowHeight } = useWindowSize();
  const addThreshold = useBoundStore(({ addThreshold }) => addThreshold);
  const [section2Ref, section2] = useRect();
  const [section3Ref, section3] = useRect();

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

  const ProjectCard = ({
    src,
    title,
    year,
    desc,
  }: {
    src: string;
    title: string;
    year: number | string;
    desc: string;
  }) => {
    return (
      <div className='flex w-full max-w-[546px] flex-col'>
        <div className=' relative aspect-[0.87] h-full w-full'>
          <Image
            layout='fill'
            objectFit='cover'
            src={src}
            alt='Project Image'
            quality={90}
          />
        </div>
        <div className=' mt-6 flex w-full flex-col'>
          <div className=' flex w-full items-end justify-between'>
            <div className='text-[24px]'>{title}</div>
            <div className='text-[14px]'> {year}</div>
          </div>
          <div className='mt-2 text-[16px] text-[#797a7d]'>{desc}</div>
        </div>
      </div>
    );
  };

  React.useEffect(() => {
    const top = section2.top;
    addThreshold({ id: 'who-we-are', value: top });
  }, [section2]);

  React.useEffect(() => {
    const top = section3.top;
    addThreshold({ id: 'work', value: top });
  }, [section3]);

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

        <section className='relative text-white' ref={section2Ref}>
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

        <section className='relative text-white' ref={section3Ref}>
          <div className='container mx-auto flex min-h-[300vh] flex-col items-center px-5 lg:px-0'>
            <h1 className='z-[1] max-w-[998px] text-center text-[clamp(2.5em,5vw,5.625em)]'>
              Let&apos;s create something that you love!
            </h1>
            <div className='mt-14 flex w-full flex-col items-center lg:mt-0'>
              <div className='flex w-full max-w-[1124px] flex-col gap-14 lg:-mt-14 lg:flex-row lg:gap-0'>
                <div className='lg:basis-1/2'>
                  <ProjectCard
                    src='/images/clarity_cooperative/thumb.jpg'
                    title='Clarity Cooperative'
                    year={2021}
                    desc='Branding, UX/UI Design, Web Development , +3 More'
                  />
                </div>
                <div className='lg:mt-48 lg:basis-1/2'>
                  <ProjectCard
                    src='/images/simply_get_away/thumb.jpg'
                    title='Simply Get Away'
                    year={2021}
                    desc='Branding, UX/UI Design, Web Development'
                  />
                </div>
              </div>
              <div className='my-14 w-full max-w-[546px]'>
                <ProjectCard
                  src='/images/elf_creek_games/thumb.jpg'
                  title='Elf Creek Games'
                  year={2021}
                  desc='Branding, UX/UI Design, Web Development, +1 More'
                />
              </div>
              <div className='flex w-full max-w-[1124px] flex-col gap-14  lg:flex-row lg:gap-0'>
                <div className='lg:basis-1/2'>
                  <ProjectCard
                    src='/images/clarity_therapy/thumb.jpg'
                    title='Clarity Therapy NYC'
                    year={2021}
                    desc='Branding, UX/UI Design, Web Development  (+5 More)'
                  />
                </div>
                <div className='lg:mt-48 lg:basis-1/2'>
                  <ProjectCard
                    src='/images/effective_agents/thumb.jpg'
                    title='Effective Agents'
                    year={2021}
                    desc='UX/UI Design, Web Development, Photography'
                  />
                </div>
              </div>
            </div>
            <div className='mt-14 mb-20 lg:mb-28'>View all work</div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
