'use client';

import useSyncAtom from '@/store/useSyncAtom';
import {
  allDailyEventsAtom,
  dailyEventsWithTimesAtom,
  allWeeklyEventsAtom,
  EventsDateAndCountAtom,
} from '@/store';
import { DailyStatsSection, WeeklyStatsSection } from './StatsSection';
import { Earthquakes, EventsDateAndCount } from '@/types';
import { EventTimeAndMagnitude } from '@/utils/fetchEarthquakes';

type FactsPageContent = {
  // allDailyEvents: Earthquakes;
  // dailyEventsWithTimes: EventTimeAndMagnitude[];
  allWeeklyEvents: Earthquakes;
  eventsByDate: EventsDateAndCount;
};

const FactsPageContent = ({
  // allDailyEvents,
  // dailyEventsWithTimes,
  allWeeklyEvents,
  eventsByDate,
}: FactsPageContent) => {
  // useSyncAtom(allDailyEventsAtom, allDailyEvents);
  // useSyncAtom(dailyEventsWithTimesAtom, dailyEventsWithTimes);
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
