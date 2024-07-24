import {
  fetchAndProcessEarthquakes,
  fetchLastWeekTopMagnitudeEarthquakes,
  fetchAllLastWeekEarthquakes,
} from '@/utils/fetchEarthquakes';
import FactsPageContent from '../components/FactsPageContent';

export default async function FactsPage() {
  const processedDailyEarthquakeData = await fetchAndProcessEarthquakes();
  const weeklyHighMagnitudeEvents =
    await fetchLastWeekTopMagnitudeEarthquakes();
  const allLastWeekEventCount = await fetchAllLastWeekEarthquakes();

  return (
    <div className="relative">
      <FactsPageContent
        weeklyTopMagnitudeEvents={weeklyHighMagnitudeEvents}
        weeklyTotalCount={allLastWeekEventCount}
        totalCount={processedDailyEarthquakeData.dailyTotalEvents}
        topMagnitudeEvents={processedDailyEarthquakeData.topMagnitudeEvents}
      />
    </div>
  );
}
