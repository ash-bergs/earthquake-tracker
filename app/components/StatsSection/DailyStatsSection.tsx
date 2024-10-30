import { useAtomValue } from 'jotai';
import store from '@/store';
import BreakdownCalendar from './BreakdownCalendar';
import MostActiveLocations from './MostActiveLocations';
import StandardQuakeCard from '../StandardQuakeCard';
import TotalEarthquakes from './TotalEarthquakes';
import DailyEarthquakeChart from '../Charts/DailyEarthquakeChart';

const DailyStatsSection = () => {
  const atomDate = useAtomValue(store.date.currentDateAtom);
  const dailyEvents = useAtomValue(store.daily.allDailyEventsAtom);
  const topEvents = useAtomValue(store.daily.dailyTopEventsAtom);
  const activeLocations = useAtomValue(store.daily.dailyActiveLocationsAtom);
  const totalCount = topEvents?.length;

  const currentDate = atomDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (!dailyEvents) return null; //TODO: return spinner

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
            <p className="text-4xl font-bold text-blue-800">Today</p>
          </div>

          <BreakdownCalendar calendarDate={currentDate} calendarText="Date" />
          <div className="grid grid-cols-[2fr_auto] gap-4">
            <TotalEarthquakes totalCount={totalCount} maxValue={100} />
            <MostActiveLocations locations={activeLocations} />
            {/**TODO: Add a "Highest Magnitude" event like the small most active location one */}
          </div>
        </div>

        {/** Events Graph and Most Active area */}
        {/**TODO: make nivo graph responsive without hard-coded height */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-lg font-semibold text-blue-800">
              Events Throughout Day
            </p>
            <div style={{ width: '100%', height: '325px' }}>
              <DailyEarthquakeChart />
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

export default DailyStatsSection;
