'use client';
import { useAtom, useAtomValue } from 'jotai';
import {
  activeLayersAtom,
  selectedEarthquakesAtom,
  toolPanelOpenAtom,
} from '@/store';
import EarthquakeActions from './EarthquakeActions';
import QuakeCards from '../QuakeCard';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

const ToolPanel = () => {
  const earthquakes = useAtomValue(selectedEarthquakesAtom);
  const [toolPanelOpen, setToolPanelOpen] = useAtom(toolPanelOpenAtom);
  const [activeLayers, setActiveLayer] = useAtom(activeLayersAtom);

  // TODO: would probably look better if we migrated this to an AppShell component
  // it can slide in and take a set amount of the left side of the screen
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
          {toolPanelOpen ? <FaChevronDown /> : <FaChevronUp />}
        </button>
      </div>
      {/** this will be the mass action toolbar - it should only show when earthquakes are selected */}
      {/* {earthquakes && <EarthquakeActions />} */}
      <div>
        <h2 className="font-semibold text-lg">Layers</h2>
        <div className="flex gap-4 py-2">
          <button
            onClick={() => {
              setActiveLayer({
                daily: !activeLayers.daily,
                weekly: activeLayers.weekly,
              });
            }}
            className={`flex items-center gap-2 p-2 ${
              activeLayers.daily ? 'bg-white' : 'bg-gray-200'
            } rounded-md`}
          >
            Daily
            {activeLayers.daily ? <FaEye /> : <FaEyeSlash />}
          </button>
          <button
            onClick={() => {
              setActiveLayer({
                daily: activeLayers.daily,
                weekly: !activeLayers.weekly,
              });
            }}
            className={`flex items-center gap-2 p-2 ${
              activeLayers.weekly ? 'bg-white' : 'bg-gray-200'
            } rounded-md`}
          >
            Weekly
            {activeLayers.weekly ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>
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
