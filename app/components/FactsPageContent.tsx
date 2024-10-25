'use client';

import useSyncAtom from '@/store/useSyncAtom';
import store from '@/store';
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
  useSyncAtom(store.weekly.allWeeklyEventsAtom, allWeeklyEvents);
  useSyncAtom(store.weekly.EventsDateAndCountAtom, eventsByDate);
  return (
    <main className="h-[screen]">
      <DailyStatsSection />
      <WeeklyStatsSection />
    </main>
  );
};

export default FactsPageContent;
