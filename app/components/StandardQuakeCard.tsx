'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

type QuakeCardProps = {
  place: string;
  mag: string;
  time: string;
  url: string;
};

// have a need for a non-interactive "quake card" - but I don't feel like adding a bunch of conditionals to the QuakeCard
const StandardQuakeCard = ({ place, mag, time, url }: QuakeCardProps) => {
  const name = place;
  const magnitude = Number(parseFloat(mag).toFixed(1));

  /** color the magnitude section of the card based on event severity */
  const magClass = classNames({
    'bg-blue-600': magnitude < 2,
    'bg-blue-700': magnitude >= 2 && magnitude < 4,
    'bg-blue-800': magnitude >= 4 && magnitude < 6,
    'bg-red-500': magnitude >= 6,
  });

  return (
    <div className="relative bg-gray-100 border-rounded-lg border-gray-600 rounded-lg shadow-lg p-3 text-blue-800 w-[200px] transform transition-transform duration-300 hover:scale-105">
      <div className="flex justify-between text-blue-800 items-center">
        <div
          className={classNames(
            'px-2 py-1 w-min shadow-sm rounded-lg',
            magClass
          )}
        >
          <p className="font-bold text-white">{parseFloat(mag).toFixed(1)}</p>
        </div>
        <div className="flex items-center gap-1">
          <Link
            className="text-sm underline text-blue-900 "
            href={url}
            target="_blank"
          >
            Learn More
          </Link>
          <FaExternalLinkSquareAlt size="10px" />
        </div>
      </div>

      {/** divider */}
      <div className="flex flex-col gap-1 pt-2">
        <p className=" font-semibold">{name}</p>
        <p className="text-sm">{new Date(time).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default StandardQuakeCard;
