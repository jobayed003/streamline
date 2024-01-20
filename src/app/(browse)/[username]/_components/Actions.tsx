'use client';

import { onFollow, onUnfollow } from '@/actions/follow';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';

type ActionsProps = {
  isFollowing: boolean;
  userId: string;
};

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      if (!isFollowing) {
        onFollow(userId)
          .then((data) => toast.success(`You are now following ${data.following.username}`))
          .catch(() => toast.error('Something went wrong!'));
      } else {
        onUnfollow(userId)
          .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
          .catch(() => toast.error('Something went wrong!'));
      }
    });
  };

  return (
    <>
      <Button disabled={isPending} variant={'primary'} onClick={handleClick}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </>
  );
};
