import { FaEarthAsia } from 'react-icons/fa6';
import { useAtomValue } from 'jotai';
import { dailyActiveLocationsAtom } from '@/store';

const MostActiveLocations = () => {
  const locations = useAtomValue(dailyActiveLocationsAtom);
  console.log(locations);

  if (!locations) return null;

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-inner gap-2">
      <h2 className="text-md font-medium text-gray-500">
        Most Active Locations
      </h2>
      <ul className="text-gray-500 text-lg">
        {locations.map((location) => (
          <li key={location} className="flex items-center gap-4">
            <FaEarthAsia size="20px" />
            {location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostActiveLocations;
