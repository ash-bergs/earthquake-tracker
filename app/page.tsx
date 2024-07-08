import Map from './components/Map';
import QuakeCards from './components/QuakeCard';
import { fetchEarthquakes } from '@/utils/fetchEarthquakes';

export default async function Home() {
  const earthquakes = await fetchEarthquakes();

  return (
    <div className="relative">
      <Map earthquakes={earthquakes} />
      <QuakeCards />
    </div>
  );
}
