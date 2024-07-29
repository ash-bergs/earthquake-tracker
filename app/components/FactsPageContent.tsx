'use client';

import useSyncAtom from '@/store/useSyncAtom';
import {
  allDailyEventsAtom,
  dailyEventsWithTimesAtom,
  allWeeklyEventsAtom,
  eventsByWeekdayAtom,
} from '@/store';
import { DailyStatsSection, WeeklyStatsSection } from './StatsSection';

//TODO: TYPES
type FactsPageContent = {
  allDailyEvents: any;
  allWeeklyEvents: any;
  dailyEventsWithTimes: any;
  eventsByDate: any;
};

const FactsPageContent = ({
  allDailyEvents,
  dailyEventsWithTimes,
  allWeeklyEvents,
  eventsByDate,
}: FactsPageContent) => {
  useSyncAtom(allDailyEventsAtom, allDailyEvents);
  useSyncAtom(dailyEventsWithTimesAtom, dailyEventsWithTimes);
  useSyncAtom(allWeeklyEventsAtom, allWeeklyEvents);
  useSyncAtom(eventsByWeekdayAtom, eventsByDate);
  return (
    <main className="h-[screen]">
      <DailyStatsSection />
      <WeeklyStatsSection />
    </main>
  );
};

export default FactsPageContent;
