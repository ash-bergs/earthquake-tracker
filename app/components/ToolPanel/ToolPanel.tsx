'use client';
import { useAtom, useAtomValue } from 'jotai';
import Link from 'next/link';
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

  const toggleDailyLayer = () => {
    if (
      activeLayers.daily.high ||
      activeLayers.daily.med ||
      activeLayers.daily.low
    ) {
      setActiveLayer({
        ...activeLayers,
        daily: { high: false, med: false, low: false },
      });
    } else {
      // just turn back on medium and high?
      setActiveLayer({
        ...activeLayers,
        daily: { high: true, med: true, low: false },
      });
    }
  };

  const toggleWeeklyLayer = () => {
    console.log('weekly click', activeLayers);
    if (
      activeLayers.weekly.high ||
      activeLayers.weekly.med ||
      activeLayers.weekly.low
    ) {
      setActiveLayer({
        ...activeLayers,
        weekly: { high: false, med: false, low: false },
      });
    } else {
      // just turn back on medium and high?
      setActiveLayer({
        ...activeLayers,
        weekly: { high: true, med: true, low: true },
      });
    }
  };

  const isDailyActive =
    activeLayers.daily.low || activeLayers.daily.med || activeLayers.daily.high;

  const isWeeklyyActive =
    activeLayers.weekly.low ||
    activeLayers.weekly.med ||
    activeLayers.weekly.high;

  const toggleMagnitude = (
    layer: 'daily' | 'weekly',
    level: 'low' | 'med' | 'high'
  ) => {
    setActiveLayer({
      ...activeLayers,
      [layer]: {
        ...activeLayers[layer],
        [level]: !activeLayers[layer][level], // toggle the selected magnitude on the given layer
      },
    });
  };

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
        <div className="py-2">
          <div className="dailyContainer pb-2">
            <button
              onClick={toggleDailyLayer}
              className={`flex items-center gap-2 p-2 ${
                activeLayers.daily ? 'bg-white' : 'bg-gray-200'
              } rounded-md`}
            >
              Daily
              {isDailyActive ? <FaEye /> : <FaEyeSlash />}
            </button>

            {isDailyActive && (
              <div className="flex gap-2 py-3">
                <fieldset>
                  <legend>Mag: </legend>
                </fieldset>

                <div>
                  <input
                    type="checkbox"
                    id="high"
                    name="high"
                    value="high"
                    checked={activeLayers.daily.high}
                    onChange={() => toggleMagnitude('daily', 'high')}
                    style={{ marginRight: '4px' }}
                  />
                  <label htmlFor="high">High</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="med"
                    name="med"
                    value="med"
                    checked={activeLayers.daily.med}
                    onChange={() => toggleMagnitude('daily', 'med')}
                    style={{ marginRight: '4px' }}
                  />
                  <label htmlFor="med">Medium</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="low"
                    name="low"
                    value="low"
                    checked={activeLayers.daily.low}
                    onChange={() => toggleMagnitude('daily', 'low')}
                    style={{ marginRight: '4px' }}
                  />
                  <label htmlFor="low">Low</label>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleWeeklyLayer}
            className={`flex items-center gap-2 p-2 ${
              isWeeklyyActive ? 'bg-white' : 'bg-gray-200'
            } rounded-md`}
          >
            Weekly
            {isWeeklyyActive ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {isWeeklyyActive && (
          <div className="flex gap-2 py-3">
            <fieldset>
              <legend>Mag: </legend>
            </fieldset>

            <div>
              <input
                type="checkbox"
                id="high"
                name="high"
                value="high"
                checked={activeLayers.weekly.high}
                onChange={() => toggleMagnitude('weekly', 'high')}
                style={{ marginRight: '4px' }}
              />
              <label htmlFor="high">High</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="med"
                name="med"
                value="med"
                checked={activeLayers.weekly.med}
                onChange={() => toggleMagnitude('weekly', 'med')}
                style={{ marginRight: '4px' }}
              />
              <label htmlFor="med">Medium</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="low"
                name="low"
                value="low"
                checked={activeLayers.weekly.low}
                onChange={() => toggleMagnitude('weekly', 'low')}
                style={{ marginRight: '4px' }}
              />
              <label htmlFor="low">Low</label>
            </div>
          </div>
        )}
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
