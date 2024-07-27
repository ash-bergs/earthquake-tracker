import {
  fetchAndProcessEarthquakes,
  fetchLastWeekTopMagnitudeEarthquakes,
  fetchAllLastWeekEarthquakes,
  fetchTodaySignificantEvents,
} from '@/utils/fetchEarthquakes';
import FactsPageContent from '../components/FactsPageContent';

export default async function FactsPage() {
  const dailySignificantEvents = await fetchTodaySignificantEvents();
  const processedDailyEarthquakeData = await fetchAndProcessEarthquakes();
  const weeklyHighMagnitudeEvents =
    await fetchLastWeekTopMagnitudeEarthquakes();
  const allLastWeekEventCount = await fetchAllLastWeekEarthquakes();

  return (
    <div className="relative">
      <FactsPageContent
        weeklyTopMagnitudeEvents={weeklyHighMagnitudeEvents}
        weeklyTotalCount={allLastWeekEventCount}
        totalCount={dailySignificantEvents || 0}
        topMagnitudeEvents={processedDailyEarthquakeData.topMagnitudeEvents}
      />
    </div>
  );
}
