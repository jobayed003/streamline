import { Logo } from './_components/Logo';

export default function AuthLayout({ children }: Children) {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-y-4'>
      <Logo />
      {children}
    </div>
  );
}
