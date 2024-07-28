'use client';

import { Earthquakes } from '@/types';
import StatsSection from './StatsSection/StatsSection';
import useSyncAtom from '@/store/useSyncAtom';
import { allDailyEventsAtom, dailyEventsWithTimesAtom } from '@/store';

type FactsPageContent = {
  allDailyEvents: any; // this is ALL the earthquakes for the day, regardless of magnitude
  dailyEventsWithTimes: any; // those of significant magnitude with times they occured
  topMagnitudeEvents: Earthquakes;
  totalCount: number;
  weeklyTotalCount: number;
  weeklyTopMagnitudeEvents: Earthquakes;
};

const FactsPageContent = ({
  allDailyEvents,
  dailyEventsWithTimes,
  topMagnitudeEvents,
  totalCount,
  weeklyTotalCount,
  weeklyTopMagnitudeEvents,
}: FactsPageContent) => {
  useSyncAtom(dailyEventsWithTimesAtom, dailyEventsWithTimes);
  useSyncAtom(allDailyEventsAtom, allDailyEvents);
  return (
    <main className="bg-royal-blue-900 h-[screen]">
      <StatsSection topEvents={topMagnitudeEvents} totalCount={totalCount} />
      <StatsSection
        isWeekly
        topEvents={weeklyTopMagnitudeEvents}
        totalCount={weeklyTotalCount}
      />
    </main>
  );
};

export default FactsPageContent;
