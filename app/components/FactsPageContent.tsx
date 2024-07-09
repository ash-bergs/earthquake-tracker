'use client';
import { Earthquakes } from '@/types';
import { earthquakesAtom } from '@/store';
import useSyncAtom from '@/store/useSyncAtom';
import StandardQuakeCard from './StandardQuakeCard';

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

  return (
    <main className="flex flex-col gap-4 bg-black h-screen text-white">
      <p>Number of quakes today: {totalCount}</p>
      <div>
        <p>Highest Magnitude Quakes Today</p>
        <div className="flex gap-2">
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
