import { fetchWeeklyGraphStats } from '@/utils/fetchEarthquakes';
import FactsPageContent from '../components/FactsPageContent';

export const revalidate = 900; // revalidate every 15 minutes

export default async function FactsPage() {
  const weeklyEventsData = await fetchWeeklyGraphStats();
  const { weeklyEvents, eventsByDate } = weeklyEventsData;

  return (
    <div className="relative">
      <FactsPageContent
        allWeeklyEvents={weeklyEvents}
        eventsByDate={eventsByDate}
      />
    </div>
  );
}
