'use client';

import { FaEarthAsia } from 'react-icons/fa6';
import CircularScale from '../Charts/CircularScale';
import Link from 'next/link';
import ToolTip from '../ToolTip/ToolTip';

type TotalEarthquakesProps = {
  totalCount: number;
  maxValue: number;
};

const TotalEarthquakes = ({ totalCount, maxValue }: TotalEarthquakesProps) => {
  return (
    <div className="flex flex-col  p-4 bg-white text-blue-900 shadow-sm rounded-lg border-[0.75px] border-gray-100">
      <p className="text-lg font-semibold text-blue-800">Total Earthquakes</p>
      {/** Tooltip icon */}
      <ToolTip content={<ToolTipContent />} />
      <CircularScale value={totalCount} maxValue={maxValue} />
      <div className="flex self-center gap-2 pb-4 ">
        <FaEarthAsia size="60px" />
        <div className="relative">
          <p className="text-5xl font-medium">{totalCount}</p>
          <p className="absolute w-max text-xs font-light left-2">
            2.5+ magnitude
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalEarthquakes;

const ToolTipContent = () => (
  <>
    <p className="font-semibold text-lg">How are these numbers calculated?</p>
    <p>
      These numbers are based off of earthquake events that are of a detectable
      and a significicant maginitude, 2.5 or greater.
    </p>
    <Link
      className="font-semibold underline text-red-700"
      href={
        'https://www.usgs.gov/programs/earthquake-hazards/lists-maps-and-statistics'
      }
      target={'_blank'}
    >
      Learn more on the USGS website
    </Link>
  </>
);
