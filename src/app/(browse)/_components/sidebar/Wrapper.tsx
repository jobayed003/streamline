'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';
import { useIsClient } from 'usehooks-ts';
import { RecommendedSkeleton } from './Recommended';
import { ToggleSkeleton } from './Toggle';

export const Wrapper = ({ children }: Children) => {
  const { collapsed } = useSidebar((state) => state);
  const isClient = useIsClient();

  if (!isClient)
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
