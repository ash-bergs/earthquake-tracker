import { Earthquakes } from '@/types';
import StatsSection from './StatsSection/StatsSection';

type FactsPageContent = {
  topMagnitudeEvents: Earthquakes;
  totalCount: number;
  weeklyTotalCount: number;
  weeklyTopMagnitudeEvents: Earthquakes;
};

const FactsPageContent = ({
  topMagnitudeEvents,
  totalCount,
  weeklyTotalCount,
  weeklyTopMagnitudeEvents,
}: FactsPageContent) => {
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
