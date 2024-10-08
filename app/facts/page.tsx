import { fetchDailyStats, fetchWeeklyStats } from '@/utils/fetchEarthquakes';
import FactsPageContent from '../components/FactsPageContent';

export const revalidate = 900; // revalidate every 15 minutes

export default async function FactsPage() {
  const dailyEventsData = await fetchDailyStats();
  const weeklyEventsData = await fetchWeeklyStats();

  const { dailyEvents, dailyEventsWithTimes } = dailyEventsData;
  const { weeklyEvents, eventsByDate } = weeklyEventsData;

  return (
    <div className="relative">
      <FactsPageContent
        allDailyEvents={dailyEvents}
        dailyEventsWithTimes={dailyEventsWithTimes}
        allWeeklyEvents={weeklyEvents}
        eventsByDate={eventsByDate}
      />
    </div>
  );
}
