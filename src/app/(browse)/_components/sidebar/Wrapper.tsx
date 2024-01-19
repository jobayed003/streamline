'use client';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';

export const Wrapper = ({ children }: Children) => {
  const { collapsed } = useSidebar((state) => state);
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
