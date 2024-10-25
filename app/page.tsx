import Map from './components/Map';
import ToolPanel from './components/ToolPanel';

export const revalidate = 900; // revalidate every 15 minutes

/**
 * Home component - Fetches earthquake data and renders the Map & ToolPanel
 *
 * @returns {JSX.Element} The home page layout with earthquake data
 */

export default async function Home() {
  return (
    <div className="relative">
      <Map />
      <ToolPanel />
    </div>
  );
}
