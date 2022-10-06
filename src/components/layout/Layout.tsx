/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react-hooks/exhaustive-deps */
const { useFrame, useLayoutEffect } = require('@studio-freight/hamo');
const Lenis = require('@studio-freight/lenis');
import { useRouter } from 'next/router';
import { useState } from 'react';

import clsxm from '@/lib/clsxm';
import useBoundStore from '@/lib/store';

type LayoutType = {
  children: React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
};

export default function Layout({
  children,
  // eslint-disable-next-line unused-imports/no-unused-vars
  theme = 'light',
  className,
}: LayoutType) {
  const [lenis, setLenis] = useBoundStore((state) => [
    state.lenis,
    state.setLenis,
  ]);
  const router = useRouter();
  // const [ref, { height }] = useMeasure({ debounce: 100 })

  useLayoutEffect(() => {
    // if (isTouchDevice === undefined) return
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    window.lenis = lenis;
    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  const [hash, setHash] = useState();

  useLayoutEffect(() => {
    if (lenis && hash) {
      // scroll to on hash change
      const target = document.querySelector(hash);
      lenis.scrollTo(target, { offset: 0 });
    }
  }, [lenis, hash]);

  useLayoutEffect(() => {
    // update scroll position on page refresh based on hash
    if (router.asPath.includes('#')) {
      const hash = router.asPath.split('#').pop();
      setHash('#' + hash);
    }
  }, [router]);

  // ! Just for debugging
  // useLayoutEffect(() => {
  //   if (!lenis) return;

  //   function onScroll(e) {
  //     console.log(e)
  //   }

  //   lenis.on('scroll', onScroll);

  //   return () => {
  //     lenis.off('scroll', onScroll);
  //   };
  // }, [lenis]);

  useLayoutEffect(() => {
    // catch anchor links clicks
    function onClick(e: any) {
      e.preventDefault();
      const node = e.currentTarget;
      const hash = node.href.split('#').pop();
      setHash('#' + hash);
      setTimeout(() => {
        window.location.hash = hash;
      }, 0);
    }

    const internalLinks = [...document.querySelectorAll('[href]')].filter(
      (node) => node.href.includes(router.pathname + '#')
    );

    internalLinks.forEach((node) => {
      node.addEventListener('click', onClick, false);
    });

    return () => {
      internalLinks.forEach((node) => {
        node.removeEventListener('click', onClick, false);
      });
    };
  }, []);

  useFrame((time: any) => {
    lenis?.raf(time);
  }, []);

  return (
    <>
      <div className={clsxm(className)}>{children}</div>
    </>
  );
}
