'use client';
import Link from 'next/link';
import { FaEarthAsia } from 'react-icons/fa6';

const NavHeader = () => {
  return (
    <div className="flex items-center h-[60px] bg-royal-blue-800 gap-4 px-4 py-4 text-royal-blue-50 text-lg font-medium">
      <FaEarthAsia size="30px" color="#f0f5fe" />
      <Link href="/">Earthquake Tracker</Link>
      <Link href="/facts">Daily Breakdown</Link>
    </div>
  );
};

export default NavHeader;
