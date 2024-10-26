'use client';
import { useAtom, useAtomValue } from 'jotai';
import store from '@/store';
import QuakeCards from '../QuakeCard';
import LayerToggle from './LayerToggle';
import MagnitudeToggle from './MagnitudeToggle';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import { FaScrewdriverWrench } from 'react-icons/fa6';

const ToolPanel = () => {
  const earthquakes = useAtomValue(store.map.selectedEarthquakesAtom);
  const [toolPanelOpen, setToolPanelOpen] = useAtom(
    store.map.toolPanelOpenAtom
  );
  const activeLayers = useAtomValue(store.map.activeLayersAtom);

  const isDailyActive =
    activeLayers.daily.low || activeLayers.daily.med || activeLayers.daily.high;

  const isWeeklyActive =
    activeLayers.weekly.low ||
    activeLayers.weekly.med ||
    activeLayers.weekly.high;

  // TODO: would probably look better if we migrated this to an AppShell component
  // it can slide in and take a set amount of the left side of the screen
  return (
    <div
      className={`absolute top-[20px] right-[20px] bg-gray-100 shadow-inner border-[2px] border-gray-200 z-1000 rounded-lg overflow-hidden min-w-[280px] max-w-[280px] text-blue-800 transition-all duration-300 ${
        toolPanelOpen ? '' : 'max-h-[60px]'
      }`}
    >
      <div className="pb-4 flex gap-2 p-4 items-center justify-between">
        <div className="flex gap-2 items-center">
          <FaScrewdriverWrench size="20px" />
          <h2 className="text-xl text-blue-800 font-semibold">Tool Panel</h2>
        </div>
        <button onClick={() => setToolPanelOpen(!toolPanelOpen)}>
          {toolPanelOpen ? (
            <FaChevronDown size="16px" />
          ) : (
            <FaChevronUp size="16px" />
          )}
        </button>
      </div>
      {/** this will be the mass action toolbar - it should only show when earthquakes are selected */}
      {/* {earthquakes && <EarthquakeActions />} */}
      <div>
        <h2 className="font-semibold text-xl pb-1 pl-2">Layers</h2>
        <div
          className="py-4 px-4"
          style={{
            background: 'white',
            boxShadow: 'inset 0px 6px 6px -9px #718096',
          }}
        >
          <div className="dailyContainer pb-2">
            <LayerToggle layer="daily" isActive={isDailyActive} />
            {isDailyActive && <MagnitudeToggle layer="daily" />}
          </div>
          <div className="weeklyContainer">
            <LayerToggle layer="weekly" isActive={isWeeklyActive} />
            {isWeeklyActive && <MagnitudeToggle layer="weekly" />}
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-xl pt-2 pl-2">Selected Events</h2>
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
