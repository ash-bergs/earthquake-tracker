'use client';
import { useAtomValue } from 'jotai';
import { selectedEarthquakesAtom } from '@/store';
import EarthquakeActions from './EarthquakeActions';
import QuakeCards from '../QuakeCard';
import { FaScrewdriverWrench } from 'react-icons/fa6';

//TODO: Create an overlay button view for this to open and close the selected quakes pane
const ToolPanel = () => {
  const earthquakes = useAtomValue(selectedEarthquakesAtom);

  return (
    <div className="absolute top-[20px] right-[20px] bg-royal-blue-50 z-1000 p-4 rounded-lg overflow-hidden min-w-[280px] max-w-[280px] shadow-lg text-royal-blue-900">
      <div className="pb-4 flex gap-2 items-center">
        <FaScrewdriverWrench size="25px" />
        <h2 className="text-xl text-royal-blue-900 font-semibold">
          Tool Panel
        </h2>
      </div>
      {/** this will be the mass action toolbar - it should only show when earthquakes are selected */}
      {earthquakes && <EarthquakeActions />}

      {earthquakes && <QuakeCards />}
      {!earthquakes.length && (
        <div className="bg-white p-4">
          <p className="text-royal-blue-900 text-md">
            Select some events from the map to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default ToolPanel;
