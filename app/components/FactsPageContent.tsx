'use client';

import { DailyStatsSection, WeeklyStatsSection } from './StatsSection';

const FactsPageContent = () => {
  return (
    <main className="h-[screen]">
      <DailyStatsSection />
      <WeeklyStatsSection />
    </main>
  );
};

export default FactsPageContent;
