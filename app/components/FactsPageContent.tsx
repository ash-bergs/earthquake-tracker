import { Earthquakes } from '@/types';
import StatsSection from './FactPageContent/StatsSection';

type FactsPageContent = {
  topMagnitudeEvents: Earthquakes;
  totalCount: number;
  weeklyTotalCount: number;
  weeklyTopMagnitudeEvents: Earthquakes;
};

//TODO: break this up into components
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
