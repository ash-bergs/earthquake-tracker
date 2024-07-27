import { Earthquakes } from '@/types';
import { useEffect, useState } from 'react';
import { FaEarthAsia } from 'react-icons/fa6';
import { fetchEarthquakes } from '@/utils/fetchEarthquakes';

//TODO: a lot here can be captured and managed in atoms
//TODO: currently only getting the active locations based off of today
const getMostActiveLocations = (earthquakes: Earthquakes) => {
  const regions: { [key: string]: number } = {};

  earthquakes.forEach((event) => {
    const region = event.properties?.place.split(', ').pop();

    if (regions[region]) {
      regions[region]++;
    } else {
      regions[region] = 1;
    }
  });

  const sortedRegions = Object.entries(regions).sort((a, b) => b[1] - a[1]);
  return sortedRegions.slice(0, 3).map((region) => region[0]);
};

const MostActiveLocations = () => {
  const [locations, setLocations] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      const earthquakes = await fetchEarthquakes();
      const activeLocations = getMostActiveLocations(earthquakes);
      setLocations(activeLocations);
    };

    getData();
  }, []);

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
