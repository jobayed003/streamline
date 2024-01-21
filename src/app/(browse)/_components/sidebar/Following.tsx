'use client';

import { useSidebar } from '@/store/useSidebar';
import { Follow, User } from '@prisma/client';
import { UserItemSkeleton } from './Recommended';
import { UserItem } from './UserItem';

type FollowingProps = {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
    };
  })[];
};

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar();

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className='pl-6 mb-4'>
          <p className='text-sm text-muted-foreground'>
            Following
          </p>
        </div>
      )}

      <ul className='space-y-2 px-2'>
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => (
  <ul className='space-y-2 px-2'>
    {[...Array(3)].map((_, i) => (
      <UserItemSkeleton key={i} />
    ))}
  </ul>
);
