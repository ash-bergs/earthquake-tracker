import {
  fetchAndProcessEarthquakes,
  fetchLastWeekTopMagnitudeEarthquakes,
  fetchAllLastWeekEarthquakes,
  fetchTodaySignificantEvents,
  fetchTodaySignificantEventsWithTimes,
} from '@/utils/fetchEarthquakes';
import FactsPageContent from '../components/FactsPageContent';

export default async function FactsPage() {
  const dailySignificantEvents = await fetchTodaySignificantEvents();
  const processedDailyEarthquakeData = await fetchAndProcessEarthquakes();
  const weeklyHighMagnitudeEvents =
    await fetchLastWeekTopMagnitudeEarthquakes();
  const allLastWeekEventCount = await fetchAllLastWeekEarthquakes();
  const dailyEventsWithTimes = await fetchTodaySignificantEventsWithTimes();
  return (
    <div className="relative">
      <FactsPageContent
        allDailyEvents={processedDailyEarthquakeData.earthquakes}
        dailyEventsWithTimes={dailyEventsWithTimes}
        weeklyTopMagnitudeEvents={weeklyHighMagnitudeEvents}
        weeklyTotalCount={allLastWeekEventCount}
        totalCount={dailySignificantEvents || 0}
        topMagnitudeEvents={processedDailyEarthquakeData.topMagnitudeEvents}
      />
    </div>
  );
}
