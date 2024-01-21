'use client';

import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/useCreatorSidebar';

export const Wrapper = ({ children }: Children) => {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col  w-[70px] lg:w-60 h-full bg-slate-950 border-r broder-[#2D2E35]',
        collapsed && 'lg:w-[70px]'
      )}
    >
      {children}
    </aside>
  );
};
