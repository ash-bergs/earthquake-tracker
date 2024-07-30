import Map from './components/Map';
import ToolPanel from './components/ToolPanel';
import { fetchEarthquakes } from '@/utils/fetchEarthquakes';

//TODO: investigate the best way to handle caching and revalidating in this use-case 🤔
export const revalidate = 900; // revalidate every 15 minutes

export default async function Home() {
  const earthquakes = await fetchEarthquakes();

  return (
    <div className="relative">
      <Map earthquakes={earthquakes} />
      <ToolPanel />
    </div>
  );
}
