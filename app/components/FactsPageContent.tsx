'use client';

import { useState } from 'react';
import { DailyStatsSection, WeeklyStatsSection } from './StatsSection';

//TODO: Design the tabbed header here
const FactsPageContent = () => {
  const [isDailyView, setIsDailyView] = useState(true);

  return (
    <main>
      <div className="flex gap-4 p-6">
        <p
          onClick={() => setIsDailyView(true)}
          className={`cursor-pointer ${
            isDailyView ? 'font-bold text-blue-700' : ''
          }`}
        >
          Today
        </p>
        <p
          onClick={() => setIsDailyView(false)}
          className={`cursor-pointer ${
            !isDailyView ? 'font-bold text-blue-700' : ''
          }`}
        >
          This Week
        </p>
      </div>
      {isDailyView ? <DailyStatsSection /> : <WeeklyStatsSection />}
    </main>
  );
};

export default FactsPageContent;
