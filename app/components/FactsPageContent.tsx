'use client';
import { useAtomValue } from 'jotai';
import { Earthquakes } from '@/types';
import { earthquakesAtom } from '@/store';
import useSyncAtom from '@/store/useSyncAtom';
import StandardQuakeCard from './StandardQuakeCard';
import { FaEarthAsia } from 'react-icons/fa6';
import { currentDateStringAtom } from '@/store';

type FactsPageContent = {
  earthquakes: Earthquakes;
  topMagnitudeEvents: Earthquakes;
  totalCount: number;
};

const FactsPageContent = ({
  earthquakes,

  topMagnitudeEvents,
  totalCount,
}: FactsPageContent) => {
  useSyncAtom(earthquakesAtom, earthquakes);
  const currentDate = useAtomValue(currentDateStringAtom);

  return (
    <main className="flex flex-col gap-4 bg-black-900 h-screen text-white p-10 ">
      <h1 className="text-5xl">Overview - {currentDate}</h1>
      <div className="relative flex justify-center items-center gap-2 p-16 bg-black-100 text-purple-heart-900 w-[300px]  shadow-lg rounded-lg">
        <p className="absolute text-sm text-black-700 top-3 left-4">
          Earthquakes Today
        </p>
        <FaEarthAsia size="40px" />
        <p className="text-4xl">{totalCount}</p>
      </div>
      <div>
        <h2 className="pb-4 text-4xl">Notable Events</h2>
        <div className="flex flex-wrap gap-4">
          {topMagnitudeEvents.map((event) => {
            return (
              <StandardQuakeCard
                place={event.properties?.place}
                mag={event.properties?.mag}
                time={event.properties?.time}
                url={event.properties?.url}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default FactsPageContent;
