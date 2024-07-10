import {
  fetchAndProcessEarthquakes,
  fetchLastWeekTopMagnitudeEarthquakes,
} from '@/utils/fetchEarthquakes';
import FactsPageContent from '../components/FactsPageContent';

export default async function FactsPage() {
  const processedEarthQuakesData = await fetchAndProcessEarthquakes();
  const weeklyTopMagnitudeEvents = await fetchLastWeekTopMagnitudeEarthquakes();

  return (
    <div className="relative">
      <FactsPageContent
        weeklyTopMagnitudeEvents={weeklyTopMagnitudeEvents}
        earthquakes={processedEarthQuakesData.earthquakes}
        totalCount={processedEarthQuakesData.totalCount}
        topMagnitudeEvents={processedEarthQuakesData.topMagnitudeEvents}
      />
    </div>
  );
}
