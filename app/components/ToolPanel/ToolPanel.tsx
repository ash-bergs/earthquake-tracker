'use client';
import { useAtom, useAtomValue } from 'jotai';
import { selectedEarthquakesAtom, toolPanelOpenAtom } from '@/store';
import EarthquakeActions from './EarthquakeActions';
import QuakeCards from '../QuakeCard';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import { FaScrewdriverWrench } from 'react-icons/fa6';

//TODO: Create an overlay button view for this to open and close the selected quakes pane
const ToolPanel = () => {
  const earthquakes = useAtomValue(selectedEarthquakesAtom);
  const [toolPanelOpen, setToolPanelOpen] = useAtom(toolPanelOpenAtom);

  return (
    <div
      className={`absolute top-[20px] right-[20px] bg-gray-100 shadow-inner border-[2px] border-gray-200 z-1000 p-4 rounded-lg overflow-hidden min-w-[280px] max-w-[280px] text-blue-800 transition-all duration-300 ${
        toolPanelOpen ? 'max-h-[70vh]' : 'max-h-[60px]'
      }`}
    >
      <div className="pb-4 flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <FaScrewdriverWrench size="20px" />
          <h2 className="text-xl text-blue-800 font-semibold">Tool Panel</h2>
        </div>
        <button onClick={() => setToolPanelOpen(!toolPanelOpen)}>
          {toolPanelOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {/** this will be the mass action toolbar - it should only show when earthquakes are selected */}
      {/* {earthquakes && <EarthquakeActions />} */}

      {earthquakes && <QuakeCards />}
      {!earthquakes.length && (
        <p className="text-blue-800 text-md px-2 py-1 bg-white rounded-md shadow-lg border-[0.75px] border-gray-100">
          Select some events from the map to get started!
        </p>
      )}
    </div>
  );
};

export default ToolPanel;
