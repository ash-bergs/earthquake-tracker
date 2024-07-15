'use client';
import Link from 'next/link';
import { FaEarthAsia } from 'react-icons/fa6';

const NavHeader = () => {
  return (
    <div className="flex items-center h-[60px] bg-orange-50 gap-4 px-4 py-4 text-black-700 text-lg font-medium">
      <FaEarthAsia size="30px" color="#e12700" />
      <Link href="/">Earthquake Tracker</Link>
      <Link href="/facts">Daily Breakdown</Link>
    </div>
  );
};

export default NavHeader;
