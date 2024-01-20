import { isFollowingUser } from '@/lib/followService';
import { getUserByUsername } from '@/lib/userService';
import { notFound } from 'next/navigation';
import { Actions } from './_components/Actions';

type UserPageProps = {
  params: { username: string };
};

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = params;

  const user = await getUserByUsername(username);

  if (!user) notFound();

  const isFollowing = await isFollowingUser(user.id);

  return (
    <div className='flex flex-col gap-y-4'>
      <p>username: {user.username}</p>
      <p>user ID: {user.id}</p>
      <p>is following: {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
};

export default UserPage;
