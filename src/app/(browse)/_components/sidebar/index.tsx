import { getFollowedUsers } from '@/lib/followService';
import { getRecommended } from '@/lib/recommendedService';
import { Following, FollowingSkeleton } from './Following';
import { Recommended, RecommendedSkeleton } from './Recommended';
import { Toggle, ToggleSkeleton } from './Toggle';
import { Wrapper } from './Wrapper';

export const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();

  return (
    <Wrapper>
      <Toggle />
      <div className='space-y-4 pt-4 lg:pt-0'>
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => (
  <aside className={'fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-slate-950 border-r broder-[#2D2E35] z-50'}>
    <ToggleSkeleton />
    <FollowingSkeleton />
    <RecommendedSkeleton />
  </aside>
);
