'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export const Container = ({ children }: Children) => {
  const matches = useMediaQuery('(max-width: 1024px)');
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches]);

  return <div className={cn('flex-1', collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60')}>{children}</div>;
};
