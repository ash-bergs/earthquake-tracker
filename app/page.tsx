import Map from './components/Map';
import ToolPanel from './components/ToolPanel';
import earthquakeService from '@/utils/services/Earthquake';

export const revalidate = 900; // revalidate every 15 minutes

/**
 * Home component - Fetches earthquake data and renders the Map & ToolPanel
 *
 * @returns {JSX.Element} The home page layout with earthquake data
 */

export default async function Home() {
  const weeklyEarthquakes = await earthquakeService.fetchWeeklyEarthquakes();

  return (
    <div className="relative">
      <Map weeklyEarthquakes={weeklyEarthquakes} />
      <ToolPanel />
    </div>
  );
}
