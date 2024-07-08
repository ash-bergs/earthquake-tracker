import Map from './components/Map';
import QuakeCards from './components/QuakeCard';
import { fetchEarthquakes } from '@/utils/fetchEarthquakes';

export default async function Home() {
  const earthquakes = await fetchEarthquakes();

  return (
    <div className="relative">
      <div className="flex border-gray-600 border-4 gap-4 px-4 py-4 ">
        <p>Rumble Stats</p>
        <p>Daily Breakdown</p>
      </div>
      <Map earthquakes={earthquakes} />
      <QuakeCards />
    </div>
  );
}
