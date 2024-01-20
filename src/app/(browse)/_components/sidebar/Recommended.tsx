'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useSidebar } from '@/store/useSidebar';
import { User } from '@prisma/client';
import { UserItem } from './UserItem';

type RecommendedProps = {
  data: User[];
};

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className='pl-6 mb-4'>
          <p className='text-sm text-muted-foreground'>Recommended</p>
        </div>
      )}

      <ul className='space-y-2 px-2'>
        {data.map((user) => (
          <UserItem key={user.id} username={user.username} imageUrl={user.imageUrl} isLive={false} />
        ))}
      </ul>
    </div>
  );
};

export const UserItemSkeleton = () => (
  <li className='flex items-center gap-x-4 px-3 py-2'>
    <Skeleton className='min-h-[32px] min-w-[32px] rounded-full'>
      <div className='flex-1'>
        <Skeleton className='h-6'></Skeleton>
      </div>
    </Skeleton>
  </li>
);

export const RecommendedSkeleton = () => (
  <ul className='px-2'>
    {[...Array(3)].map((_, i) => (
      <UserItemSkeleton key={i} />
    ))}
  </ul>
);
