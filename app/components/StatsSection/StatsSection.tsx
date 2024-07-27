'use client';
import { useAtomValue } from 'jotai';
import { Earthquakes } from '@/types';
import { currentDateStringAtom, currentWeekRangeStringAtom } from '@/store';
import BreakdownCalendar from './BreakdownCalendar';
import MostActiveLocations from './MostActiveLocations';
import StandardQuakeCard from '../StandardQuakeCard';
import TotalEarthquakes from './TotalEarthquakes';
import EarthquakeChart from '../EarthquakeChart/EarthquakeChart';

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
  const maxValue = isWeekly ? 574 : 90;

  return (
    <div className="flex flex-col gap-20 px-4 py-10 sm:px-10 md:px-10 lg:px-20 xl:px-40 2xl:px-80">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] lg:grid-cols-[2fr_2fr_1fr] gap-4">
        {/* Calendar and Total area */}
        <div className="flex flex-col gap-4 min-h-full">
          <div className="flex bg-gray-100 rounded-lg p-4 justify-center">
            <p className="text-4xl font-medium text-blue-900">{headerText}</p>
          </div>
          <BreakdownCalendar
            calendarDate={calendarDate}
            calendarText={calendarText}
          />
          <TotalEarthquakes totalCount={totalCount} maxValue={maxValue} />
        </div>

        {/** Events Graph and Most Active area */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner gap-4">
            <p className="text-md font-medium text-gray-500">
              Events Throughout {isWeekly ? 'Week' : 'Day'}
            </p>
            <EarthquakeChart />
            {/* <div className="bg-blue-500 w-[100%] h-[300px]" /> */}
          </div>
          {/** Most active locations */}

          <MostActiveLocations />
        </div>

        {/** Top 5 of the Day */}
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner">
          <h2 className="text-md font-medium text-gray-500">Notable Events</h2>
          <div className="flex flex-col justify-center flex-wrap gap-6 py-2">
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

      {/** THIS WEEK */}
    </div>
  );
};

export default StatsSection;
