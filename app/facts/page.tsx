import {
  fetchLastWeekTopMagnitudeEarthquakes,
  fetchAllLastWeekEarthquakes,
  fetchDailyStats,
  fetchWeeklyStats,
} from '@/utils/fetchEarthquakes';
import FactsPageContent from '../components/FactsPageContent';

export default async function FactsPage() {
  //const dailySignificantEvents = await fetchTodaySignificantEvents();
  //const processedDailyEarthquakeData = await fetchAndProcessEarthquakes();
  const weeklyHighMagnitudeEvents =
    await fetchLastWeekTopMagnitudeEarthquakes();
  const allLastWeekEventCount = await fetchAllLastWeekEarthquakes();
  //const dailyEventsWithTimes = await fetchTodaySignificantEventsWithTimes();
  const dailyEventsData = await fetchDailyStats();

  // const test = await fetchWeeklyStats();
  // console.log(test);

  const {
    dailyEvents,
    dailyEventsTotal,
    dailyEventsWithTimes,
    topMagnitudeDailyEvents,
  } = dailyEventsData;

  return (
    <div className="relative">
      <FactsPageContent
        allDailyEvents={dailyEvents}
        dailyEventsWithTimes={dailyEventsWithTimes}
        topMagnitudeEvents={topMagnitudeDailyEvents}
        totalCount={dailyEventsTotal}
        // weedkly
        weeklyTopMagnitudeEvents={weeklyHighMagnitudeEvents}
        weeklyTotalCount={allLastWeekEventCount}
      />
    </div>
  );
}
