import { Actions } from './Actions';
import { Logo } from './Logo';

export const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full h-20 z-[49] bg-gray-950 px-2 lg:px-4 flex justify-between items-center shadow-sm'>
      <Logo />
      <Actions />
    </nav>
  );
};
