'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaEarthAsia } from 'react-icons/fa6';

const defaultStlyes =
  'transform transition-transform duration-300 hover:scale-110';
const activeStyles =
  'bg-gray-100 border-2 border-gray-100 shadow-md font-semibold px-2 py-2 rounded-md';
// xl:text-2xl md:text-xl sm:text-lg xs:text-lg

const NavHeader = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center h-[10px] bg-gray-200 gap-6 px-6 py-10 text-blue-700 font-lg shadow-md">
      <Link
        className="transform transition-transform duration-300 hover:scale-110"
        href="/"
      >
        <FaEarthAsia size="30px" color="#0a8694" />
      </Link>
      <div className="flex items-center gap-10 w-[100%]  justify-end">
        <Link href="/facts">
          <div className={pathname === '/facts' ? activeStyles : defaultStlyes}>
            Stats
          </div>
        </Link>
        <Link href="/">
          <div className={pathname === '/' ? activeStyles : defaultStlyes}>
            Earthquake Map
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavHeader;
