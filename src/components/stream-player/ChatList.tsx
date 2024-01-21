'use client';

import { ReceivedChatMessage } from '@livekit/components-react';

import { Skeleton } from '@/components/ui/skeleton';
import { stringToColor } from '@/lib/utils';
import { format } from 'date-fns';

type ChatListProps = {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
};

export const ChatList = ({ messages, isHidden }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-sm text-muted-foreground'>
          {isHidden ? 'Chat is disabled' : 'Welcome to the chat!'}
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full'>
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <Skeleton className='w-1/2 h-6' />
    </div>
  );
};

const ChatMessage = ({ data }: { data: ReceivedChatMessage }) => {
  const color = stringToColor(data.from?.name || '');

  return (
    <div className='flex gap-2 p-2 rounded-md hover:bg-white/5'>
      <p className='text-sm text-white/40'>
        {format(data.timestamp, 'HH:MM')}
      </p>
      <div className='flex flex-wrap items-baseline gap-1 grow'>
        <p className='text-sm font-semibold whitespace-nowrap'>
          <span className='truncate' style={{ color: color }}>
            {data.from?.name}
          </span>
          :
        </p>
        <p className='text-sm break-all'>{data.message}</p>
      </div>
    </div>
  );
};
