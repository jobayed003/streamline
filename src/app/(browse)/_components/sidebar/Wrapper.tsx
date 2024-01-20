'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';
import { useEffect, useState } from 'react';
import { RecommendedSkeleton } from './Recommended';
import { ToggleSkeleton } from './Toggle';

export const Wrapper = ({ children }: Children) => {
  const { collapsed } = useSidebar((state) => state);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <aside className={'fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-slate-950 border-r broder-[#2D2E35]'}>
        <ToggleSkeleton />
        <RecommendedSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-60 h-full bg-slate-950 border-r broder-[#2D2E35]',
        collapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  );
};
