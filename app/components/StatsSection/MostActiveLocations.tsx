import { FaEarthAsia } from 'react-icons/fa6';
import { useAtomValue } from 'jotai';
import { dailyActiveLocationsAtom } from '@/store';

const MostActiveLocations = () => {
  const locations = useAtomValue(dailyActiveLocationsAtom);

  if (!locations) return null;
  const mostActiveLocation = locations[0];

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm gap-2 border-[0.75px] border-gray-100">
      <h2 className="text-lg font-semibold text-blue-800">
        Most Active Location
      </h2>
      <ul className="flex text-blue-800 text-lg justify-evenly w-[100%]">
        <div>
          <li className="flex items-center border-2 border-red-500 bg-red-400 shadow-sm rounded-md text-lg text-white gap-4 p-2">
            <FaEarthAsia size="30px" color="#fff" />
            {mostActiveLocation}
          </li>
        </div>
      </ul>
    </div>
  );
};

export default MostActiveLocations;
