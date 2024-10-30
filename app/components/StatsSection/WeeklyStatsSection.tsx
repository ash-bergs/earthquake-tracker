import { useAtomValue } from 'jotai';
import store from '@/store';

import BreakdownCalendar from './BreakdownCalendar';
import MostActiveLocations from './MostActiveLocations';
import StandardQuakeCard from '../StandardQuakeCard';
import TotalEarthquakes from './TotalEarthquakes';
import WeeklyEarthquakeChart from '../Charts/WeeklyEarthquakeChart';

const WeeklyStatsSection = () => {
  const weekRange = useAtomValue(store.date.currentWeekRangeStringAtom);
  const weeklyEvents = useAtomValue(store.weekly.allWeeklyEventsAtom);
  const activeLocations = useAtomValue(store.weekly.weeklyActiveLocationsAtom);
  const topEvents = useAtomValue(store.weekly.weeklyTopEventsAtom);
  const totalCount = weeklyEvents?.length;

  if (!weeklyEvents) return null; //TODO: return spinner

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        {/* Calendar and Total area */}
        <div className="flex flex-col gap-4">
          <div
            className="border-[0.75px] border-gray-100 
            flex bg-white rounded-lg p-4
             "
          >
            <p className="text-4xl font-bold text-blue-800">This Week</p>
          </div>
          <BreakdownCalendar calendarDate={weekRange} calendarText="Week of" />
          <div className="grid grid-cols-[2fr_auto] gap-4">
            <TotalEarthquakes totalCount={totalCount} maxValue={600} />
            <MostActiveLocations locations={activeLocations} />
          </div>
        </div>

        {/** Events Graph and Most Active area */}
        {/**TODO: make nivo graph responsive without hard-coded height */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-lg font-semibold text-blue-800">
              Events Throughout Week
            </p>
            <div style={{ width: '100%', height: '325px' }}>
              <WeeklyEarthquakeChart />
            </div>
          </div>
        </div>

        {/** Top 3 of the Day */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border-[0.75px] border-gray-100">
          <h2 className="text-lg font-semibold text-blue-800">
            Notable Events
          </h2>
          <div className="flex justify-center flex-wrap gap-6 ">
            {topEvents &&
              topEvents.map((event) => {
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
    </div>
  );
};

export default WeeklyStatsSection;
