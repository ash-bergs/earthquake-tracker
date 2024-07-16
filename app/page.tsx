import Map from './components/Map';
import ToolPanel from './components/ToolPanel';
import { fetchEarthquakes } from '@/utils/fetchEarthquakes';

export default async function Home() {
  const earthquakes = await fetchEarthquakes();

  return (
    <div className="relative">
      <Map earthquakes={earthquakes} />
      <ToolPanel />
    </div>
  );
}
