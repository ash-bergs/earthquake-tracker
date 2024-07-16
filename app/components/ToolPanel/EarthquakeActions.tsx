'use client';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectedEarthquakesAtom } from '@/store';

const EarthquakeActions = () => {
  const earthquakes = useAtomValue(selectedEarthquakesAtom);

  if (!earthquakes.length) return null;
  return (
    <div className="flex gap-2 mb-4 bg-white rounded-md p-2">
      <input
        type="checkbox"
        id="select-all-events"
        className="relative peer shrink-0 appearance-none w-5 h-5 border-2 border-royal-blue-500 rounded-sm bg-white mt-1 checked:bg-blue-700 checked:border-0"
        //value
      />
      <label className="text-black-900 text-lg" htmlFor="select-all-events">
        Select All
      </label>
      <svg
        className="
      absolute 
      w-5 h-5 mt-1
      hidden peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
};

export default EarthquakeActions;
