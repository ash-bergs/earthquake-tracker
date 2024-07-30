'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaEarthAsia } from 'react-icons/fa6';

const defaultStlyes =
  'transform transition-transform duration-300 hover:scale-110';
const activeStyles =
  'bg-blue-700 border-2 border-blue-700 shadow-md font-semibold px-2 py-2 rounded-md';

const NavHeader = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center h-[60px] bg-blue-800 gap-6 px-4 py-10 text-white font-md xl:text-2xl md:text-xl sm:text-lg xs:text-lg shadow-md">
      <Link
        className="transform transition-transform duration-300 hover:scale-110"
        href="/"
      >
        <FaEarthAsia size="40px" color="#f0f5fe" />
      </Link>
      <div className="flex items-center self-center gap-10 w-[100%] justify-center">
        <Link href="/">
          <div className={pathname === '/' ? activeStyles : defaultStlyes}>
            Earthquake Map
          </div>
        </Link>
        <Link href="/facts">
          <div className={pathname === '/facts' ? activeStyles : defaultStlyes}>
            Stats
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavHeader;
