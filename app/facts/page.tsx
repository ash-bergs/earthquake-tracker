import {
  fetchAndProcessEarthquakes,
  fetchLastWeekHighMagnitudeEarthquakes,
} from '@/utils/fetchEarthquakes';
import FactsPageContent from '../components/FactsPageContent';
export default async function FactsPage() {
  // we need to also fetch the earthquakes here
  // if the user comes directly to the facts page, we won't init/see the map
  // we'll also do some pre-processing for the stuff we show on the facts page
  const processedEarthQuakesData = await fetchAndProcessEarthquakes();
  const weeklyTopMagnitudeEvents =
    await fetchLastWeekHighMagnitudeEarthquakes();

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
