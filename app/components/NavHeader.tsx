'use client';
import Link from 'next/link';

const NavHeader = () => {
  return (
    <div className="flex h-[60px] bg-purple-heart-950 gap-4 px-4 py-4">
      <div className="w-[25px] bg-gray-500 " />
      <Link className="text-white" href="/">
        Earthquake Tracker
      </Link>
      <Link className="text-white" href="/facts">
        Daily Breakdown
      </Link>
    </div>
  );
};

export default NavHeader;
