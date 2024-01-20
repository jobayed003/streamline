'use client';

import { LiveBadge } from '@/components/LiveBadge';
import { UserAvatar } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type UserItemProps = {
  username: string;
  imageUrl: string;
  isLive?: boolean;
};

export const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  const href = `/${username}`;

  const isActive = pathname === href;
  return (
    <Button
      asChild
      variant={'ghost'}
      className={cn(
        'w-full h-12',

        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent'
      )}
    >
      <Link href={href}>
        <div className={cn('flex items-center w-full gap-x-4', collapsed && 'justify-center')}>
          <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />

          {!collapsed && <p className='truncate'>{username}</p>}

          {!collapsed && isLive && <LiveBadge className='ml-auto' />}
        </div>
      </Link>
    </Button>
  );
};
