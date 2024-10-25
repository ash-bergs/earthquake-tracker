'use client';

import useSyncAtom from '@/store/useSyncAtom';
import { allWeeklyEventsAtom, EventsDateAndCountAtom } from '@/store';
import { DailyStatsSection, WeeklyStatsSection } from './StatsSection';
import { Earthquakes, EventsDateAndCount } from '@/types';

type FactsPageContent = {
  allWeeklyEvents: Earthquakes;
  eventsByDate: EventsDateAndCount;
};

const FactsPageContent = ({
  allWeeklyEvents,
  eventsByDate,
}: FactsPageContent) => {
  useSyncAtom(allWeeklyEventsAtom, allWeeklyEvents);
  useSyncAtom(EventsDateAndCountAtom, eventsByDate);
  return (
    <main className="h-[screen]">
      <DailyStatsSection />
      <WeeklyStatsSection />
    </main>
  );
};

export default FactsPageContent;
