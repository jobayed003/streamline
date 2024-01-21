import { getSelfByUsername } from '@/lib/authService';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { Container } from './_components/Container';
import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';

type CreatorLayoutProps = {
  params: { username: string };
  children: ReactNode;
};

const CreatorLayout = async ({
  children,
  params,
}: CreatorLayoutProps) => {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      <div className='flex h-full pt-20'>
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
