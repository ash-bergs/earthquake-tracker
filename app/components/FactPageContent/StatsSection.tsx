'use client';
import { useAtomValue } from 'jotai';
import { Earthquakes } from '@/types';
import StandardQuakeCard from '../StandardQuakeCard';
import { FaEarthAsia } from 'react-icons/fa6';
import { currentDateStringAtom, currentWeekRangeStringAtom } from '@/store';
import CircularScale from './CircularScale';

type StatsSectionProps = {
  totalCount: number;
  topEvents: Earthquakes;
  isWeekly?: boolean; // might want to tweak this approach later, but for now we're just doing day/week
};

const StatsSection = ({
  topEvents,
  totalCount,
  isWeekly,
}: StatsSectionProps) => {
  const currentDate = useAtomValue(currentDateStringAtom);
  const weekRange = useAtomValue(currentWeekRangeStringAtom);

  const headerText = isWeekly ? 'This week' : 'Today'; // will need to use the date to determine if this is TODAY or THIS WEEK
  const calendarText = isWeekly ? 'Week' : 'Today';
  const calendarDate = isWeekly ? weekRange : currentDate;
  const maxValue = isWeekly ? 5000 : 600;

  return (
    <div className="flex flex-col gap-20 text-white px-20 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] gap-4">
        {/* Calendar and Total area */}
        <div className="flex flex-col gap-4 min-h-full">
          <p className="text-5xl">{headerText}</p>
          <div>
            {/** Calendar Component */}
            <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-sm font-medium text-gray-500">
                {calendarText}
              </p>
              <p className="text-xl font-bold text-purple-heart-900">
                {calendarDate}
              </p>
            </div>
          </div>

          {/** Total events component */}
          <div className="relative flex flex-col justify-center items-center gap-6 p-12 bg-black-100 text-purple-heart-900 shadow-lg rounded-lg ">
            <p className="absolute text-sm font-medium text-gray-500 top-3 left-4">
              Total Earthquakes
            </p>
            <CircularScale value={totalCount} maxValue={maxValue} />
            <div className="flex items-center gap-2">
              <FaEarthAsia size="60px" />
              <p className="text-5xl font-medium">{totalCount}</p>
            </div>
          </div>
        </div>

        {/** Events Graph and Most Active area */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner gap-4">
            <p className="text-md font-medium text-gray-500">
              Events Throughout {isWeekly ? 'Week' : 'Day'}
            </p>
            <div className="bg-blue-500 w-[100%] h-[300px]" />
          </div>
          {/** Most active locations */}
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner gap-4">
            <p className="text-md font-medium text-gray-500">
              Most Active Locations
            </p>
            <ul className="text-gray-500 text-xl">
              <li className="flex items-center gap-2">
                <FaEarthAsia size="20px" />
                Southeast Asia
              </li>
              <li className="flex items-center gap-2">
                <FaEarthAsia size="20px" />
                Alaska
              </li>
              <li className="flex items-center gap-2">
                <FaEarthAsia size="20px" />
                Pacific Islands
              </li>
            </ul>
          </div>
        </div>

        {/** Top 5 of the Day */}
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner">
          <h2 className="text-md font-medium text-gray-500">Notable Events</h2>
          <div className="flex flex-col justify-center flex-wrap gap-6 py-2">
            {topEvents.map((event) => {
              return (
                <StandardQuakeCard
                  key={event.properties?.code}
                  place={event.properties?.place}
                  mag={event.properties?.mag}
                  time={event.properties?.time}
                  url={event.properties?.url}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/** THIS WEEK */}
    </div>
  );
};

export default StatsSection;
