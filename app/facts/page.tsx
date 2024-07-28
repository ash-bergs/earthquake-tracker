import { fetchDailyStats, fetchWeeklyStats } from '@/utils/fetchEarthquakes';
import FactsPageContent from '../components/FactsPageContent';

export default async function FactsPage() {
  const dailyEventsData = await fetchDailyStats();
  const weeklyEventsData = await fetchWeeklyStats();

  const {
    dailyEvents,
    dailyEventsTotal,
    dailyEventsWithTimes,
    topMagnitudeDailyEvents,
  } = dailyEventsData;

  const {
    //weeklyEvents,
    weeklyEventsTotal,
    topMagnitudeWeeklyEvents,
    //eventsByWeekday,
  } = weeklyEventsData;

  return (
    <div className="relative">
      <FactsPageContent
        allDailyEvents={dailyEvents}
        dailyEventsWithTimes={dailyEventsWithTimes}
        topMagnitudeEvents={topMagnitudeDailyEvents}
        totalCount={dailyEventsTotal}
        // weedkly
        weeklyTopMagnitudeEvents={topMagnitudeWeeklyEvents}
        weeklyTotalCount={weeklyEventsTotal}
      />
    </div>
  );
}
