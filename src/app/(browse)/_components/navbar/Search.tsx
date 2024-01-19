'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import qs from 'query-string';

export const Search = () => {
  const [value, setValue] = useState('');
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: { term: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <form className='relative w-full lg:w-[400px] flex items-center' onSubmit={onSubmit}>
      <Input
        value={value}
        placeholder='Search'
        onChange={(e) => setValue(e.target.value)}
        className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
      />

      {value && (
        <X
          className='absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition'
          onClick={() => setValue('')}
        />
      )}
      <Button type='submit' size={'default'} variant={'secondary'} className='rounded-l-none'>
        <SearchIcon className='h-5 w-5 text-muted-foreground' />
      </Button>
    </form>
  );
};
