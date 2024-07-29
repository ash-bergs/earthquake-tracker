'use client';
import Link from 'next/link';
import { FaEarthAsia } from 'react-icons/fa6';

const NavHeader = () => {
  return (
    <div className="flex items-center h-[60px] bg-blue-800 gap-4 px-4 py-10 text-white text-xl font-semibold">
      <FaEarthAsia size="40px" color="#f0f5fe" />
      <Link href="/">Earthquake Map</Link>
      <Link href="/facts">Stats</Link>
    </div>
  );
};

export default NavHeader;
