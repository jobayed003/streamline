import { notFound } from 'next/navigation';

import { StreamPlayer } from '@/components/stream-player';
import { isBlockedByUser } from '@/lib/blockService';
import { isFollowingUser } from '@/lib/followService';
import { getUserByUsername } from '@/lib/userService';

type UserPageProps = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />;
};

export default UserPage;
