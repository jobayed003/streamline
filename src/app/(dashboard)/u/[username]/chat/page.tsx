import { getSelf } from '@/lib/authService';
import { getStreamByUserId } from '@/lib/streamService';
import { ToggleCard } from './_components/ToggleCard';

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>
          Chat settings
        </h1>
      </div>

      <div className='space-y-4'>
        <ToggleCard
          field={'isChatEnabled'}
          label={'Enable Chat'}
          value={stream?.isChatEnabled!}
        />
        <ToggleCard
          field={'isChatDelayed'}
          label={'Delay chat'}
          value={stream?.isChatDelayed!}
        />
        <ToggleCard
          field={'isChatFollowersOnly'}
          label={'Must be following to chat'}
          value={stream?.isChatFollowersOnly!}
        />
      </div>
    </div>
  );
};

export default ChatPage;
