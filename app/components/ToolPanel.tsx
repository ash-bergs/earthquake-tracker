'use client';
import Link from 'next/link';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectedEarthquakesAtom } from '@/store';
import QuakeCards from './QuakeCard';

const ToolPanel = () => {
  // this button will open and close the selected quake pane and will appear as a map tool
  const earthquakes = useAtomValue(selectedEarthquakesAtom);

  return (
    <div className="absolute top-[20px] right-[20px] bg-orange-100 z-1000 p-3 rounded-lg  overflow-y-auto max-h-[80vh] min-w-[316px] max-w-[316px] shadow-lg text-black-900">
      <div className="py-2">
        <h2 className="text-2xl font-semibold">Tool Panel</h2>
      </div>
      {/** this will be the mass action toolbar - it should only show when earthquakes are selected */}
      {earthquakes && <EarthquakeActions />}

      {earthquakes && <QuakeCards />}
      {!earthquakes.length && (
        <div className="bg-orange-50 p-4">
          <p className="text-black-900 text-md">
            Select some events from the map to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default ToolPanel;

const EarthquakeActions = () => {
  const earthquakes = useAtomValue(selectedEarthquakesAtom);

  if (!earthquakes.length) return null;
  return (
    <div className="flex  gap-2 mb-2 bg-orange-50 p-2">
      <input
        type="checkbox"
        id="select-all-events"
        className="relative peer shrink-0 appearance-none w-5 h-5 border-2 border-orange-500 rounded-sm bg-white mt-1 checked:bg-orange-700 checked:border-0"
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
