'use client';

import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/useCreatorSidebar';

export const Container = ({ children }: Children) => {
  const { collapsed, onCollapse, onExpand } =
    useCreatorSidebar((state) => state);
  const matches = useMediaQuery(`(max-width: 1024px)`);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn(
        'flex-1',
        collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60'
      )}
    >
      {children}
    </div>
  );
};
