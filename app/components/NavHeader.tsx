'use client';
import Link from 'next/link';
import { FaEarthAsia } from 'react-icons/fa6';

const NavHeader = () => {
  return (
    <div className="flex items-center h-[60px] bg-purple-heart-950 gap-4 px-4 py-4 text-white text-lg">
      <FaEarthAsia size="25px" color="white" />
      <Link href="/">Earthquake Tracker</Link>
      <Link href="/facts">Daily Breakdown</Link>
    </div>
  );
};

export default NavHeader;
