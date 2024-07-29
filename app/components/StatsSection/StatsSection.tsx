import { useAtomValue } from 'jotai';
import { Earthquakes } from '@/types';
import { currentDateStringAtom, currentWeekRangeStringAtom } from '@/store';
import BreakdownCalendar from './BreakdownCalendar';
import MostActiveLocations from './MostActiveLocations';
import StandardQuakeCard from '../StandardQuakeCard';
import TotalEarthquakes from './TotalEarthquakes';
import DailyEarthquakeChart from '../Charts/DailyEarthquakeChart';

type StatsSectionProps = {
  totalCount: number;
  topEvents: Earthquakes;
  isWeekly?: boolean; // might want to tweak this approach later, but for now we're just doing day/week
};

const StatsSection = ({
  topEvents,
  totalCount,
  isWeekly,
}: StatsSectionProps) => {
  const currentDate = useAtomValue(currentDateStringAtom);
  const weekRange = useAtomValue(currentWeekRangeStringAtom);

  const headerText = isWeekly ? 'This week' : 'Today';
  const calendarText = isWeekly ? 'Week of' : 'Date';
  const calendarDate = isWeekly ? weekRange : currentDate;
  const maxValue = isWeekly ? 600 : 100;

  return (
    <div className="flex flex-col gap-20 px-4 py-10 sm:px-10 md:px-10 lg:px-20 xl:px-40 2xl:px-80">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] lg:grid-cols-[2fr_2fr_1fr] gap-4">
        {/* Calendar and Total area */}
        <div className="flex flex-col gap-4 min-h-full">
          <div
            className="border-[0.75px] border-gray-100 
            flex bg-white rounded-lg p-4
             "
            //style={{ border: '1px solid red' }}
          >
            <p className="text-4xl font-bold text-blue-800">{headerText}</p>
          </div>
          <BreakdownCalendar
            calendarDate={calendarDate}
            calendarText={calendarText}
          />
          <TotalEarthquakes totalCount={totalCount} maxValue={maxValue} />
        </div>

        {/** Events Graph and Most Active area */}
        {/**TODO: make nivo graph responsive without hard-coded height */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm sm:w-[100%] md:w-[325px] lg:w-[400px] xl:w-[100%] border-[0.75px] border-gray-100">
            <p className="text-lg font-semibold text-blue-800">
              Events Throughout {isWeekly ? 'Week' : 'Day'}
            </p>
            <div style={{ width: '100%', height: '325px' }}>
              <DailyEarthquakeChart />
            </div>
          </div>
          <MostActiveLocations />
        </div>

        {/** Top 3 of the Day */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border-[0.75px] border-gray-100">
          <h2 className="text-lg font-semibold text-blue-800">
            Notable Events
          </h2>
          <div className="flex flex-col justify-center flex-wrap gap-6 ">
            {topEvents.map((event) => {
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

export default StatsSection;
