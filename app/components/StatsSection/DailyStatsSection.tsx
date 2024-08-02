import { useAtomValue } from 'jotai';
import {
  currentDateAtom,
  allDailyEventsAtom,
  dailyTopEventsAtom,
  dailyActiveLocationsAtom,
} from '@/store';
import BreakdownCalendar from './BreakdownCalendar';
import MostActiveLocations from './MostActiveLocations';
import StandardQuakeCard from '../StandardQuakeCard';
import TotalEarthquakes from './TotalEarthquakes';
import DailyEarthquakeChart from '../Charts/DailyEarthquakeChart';

const DailyStatsSection = () => {
  const atomDate = useAtomValue(currentDateAtom);
  const dailyEvents = useAtomValue(allDailyEventsAtom);
  const topEvents = useAtomValue(dailyTopEventsAtom);
  const activeLocations = useAtomValue(dailyActiveLocationsAtom);
  const totalCount = dailyEvents?.length;

  const currentDate = atomDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (!dailyEvents) return null; //TODO: return spinner

  return (
    <div className="flex flex-col gap-20 px-4 py-10 sm:px-10 md:px-10 lg:px-20 xl:px-40 2xl:px-[500px]">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] lg:grid-cols-[2fr_2fr_1fr] gap-4">
        {/* Calendar and Total area */}
        <div className="flex flex-col gap-4 min-h-full">
          <div
            className="border-[0.75px] border-gray-100 
            flex bg-white rounded-lg p-4
             "
          >
            <p className="text-4xl font-bold text-blue-800">Today</p>
          </div>
          <BreakdownCalendar calendarDate={currentDate} calendarText="Date" />
          <TotalEarthquakes totalCount={totalCount} maxValue={100} />
        </div>

        {/** Events Graph and Most Active area */}
        {/**TODO: make nivo graph responsive without hard-coded height */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm sm:w-[100%] md:w-[325px] lg:w-[400px] xl:w-[100%] border-[0.75px] border-gray-100">
            <p className="text-lg font-semibold text-blue-800">
              Events Throughout Day
            </p>
            <div style={{ width: '100%', height: '325px' }}>
              <DailyEarthquakeChart />
            </div>
          </div>
          <MostActiveLocations locations={activeLocations} />
        </div>

        {/** Top 3 of the Day */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border-[0.75px] border-gray-100">
          <h2 className="text-lg font-semibold text-blue-800">
            Notable Events
          </h2>
          <div className="flex flex-col justify-center flex-wrap gap-6 ">
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
