import { useEffect } from 'react';

import useBoundStore from '@/lib/store';

export function useScroll(callback: any, deps = []) {
  const lenis = useBoundStore(({ lenis }: any) => lenis);

  useEffect(() => {
    if (!lenis) return;
    lenis.on('scroll', callback);
    lenis.notify();

    return () => {
      lenis.off('scroll', callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis, callback, [...deps]]);
}
