'use client';
import { useAtomValue } from 'jotai';
import { Earthquakes } from '@/types';
import { earthquakesAtom, weeklyTopMagnitudeEventsAtom } from '@/store';
import useSyncAtom from '@/store/useSyncAtom';
import StandardQuakeCard from './StandardQuakeCard';
import { FaEarthAsia } from 'react-icons/fa6';
import { currentDateStringAtom } from '@/store';

type FactsPageContent = {
  earthquakes: Earthquakes;
  topMagnitudeEvents: Earthquakes;
  totalCount: number;
  weeklyTopMagnitudeEvents: Earthquakes;
};

//TODO: break this up into components
const FactsPageContent = ({
  earthquakes,
  topMagnitudeEvents,
  totalCount,
  weeklyTopMagnitudeEvents,
}: FactsPageContent) => {
  useSyncAtom(earthquakesAtom, earthquakes);
  useSyncAtom(weeklyTopMagnitudeEventsAtom, weeklyTopMagnitudeEvents);
  const currentDate = useAtomValue(currentDateStringAtom);
  const weekEvents = useAtomValue(weeklyTopMagnitudeEventsAtom);

  return (
    <main className="flex flex-col gap-4 bg-black-950 h-screen text-white px-20 py-10">
      <div className="bg-purple-heart-950 p-12 rounded-xl animate-slideUp">
        <span
          className="flex"
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1 className="text-6xl font-medium">Overview</h1>
          {/** Calendar Component */}
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner">
            <p className="text-sm font-medium text-gray-500">Today</p>
            <p className="text-xl font-bold text-purple-heart-900">
              {currentDate}
            </p>
          </div>
        </span>
        <div className="flex py-6 justify-center">
          <div className="relative flex justify-center items-center gap-6 p-12 bg-black-100 text-purple-heart-900 w-[300px]  shadow-lg rounded-lg">
            <p className="absolute text-sm font-medium text-gray-500 top-3 left-4">
              Total Earthquakes
            </p>
            <FaEarthAsia size="80px" />
            <p className="text-5xl font-medium">{totalCount}</p>
          </div>
        </div>
        <div>
          {/** EventSection card - take events and title */}
          <h2 className="text-5xl">Notable Events</h2>
          <h3 className="py-8 text-4xl">Today</h3>
          <div className="flex justify-center flex-wrap gap-8 py-2">
            {topMagnitudeEvents.map((event) => {
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

          <h3 className="py-8 text-4xl">This Week</h3>
          <div className="flex  justify-center flex-wrap gap-8 py-2">
            {weekEvents.map((event) => {
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
    </main>
  );
};

export default FactsPageContent;
