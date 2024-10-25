'use client';

import Link from 'next/link';
import { useAtomValue, useSetAtom } from 'jotai';
import store from '@/store';
import { parsePlace } from './utils';
import { FaTrashCan } from 'react-icons/fa6';
import { FaPaperPlane } from 'react-icons/fa6';

import classNames from 'classnames';

type QuakeCardProps = {
  place: string;
  code: string;
  coords: [number, number];
  mag: string;
  time: string;
  url: string;
};

const QuakeCard = ({ place, code, coords, mag, time, url }: QuakeCardProps) => {
  const name = parsePlace(place);
  const map = store.map.useMap();
  const magnitude = Number(parseFloat(mag).toFixed(1));
  const setSelectedEarthquakes = useSetAtom(store.map.selectedEarthquakesAtom);

  /** color the magnitude section of the card based on event severity */
  const magClass = classNames({
    'bg-blue-600': magnitude < 2,
    'bg-blue-700': magnitude >= 2 && magnitude < 4,
    'bg-blue-800': magnitude >= 4 && magnitude < 6,
    'bg-red-500': magnitude >= 6,
  });

  const removeQuake = () => {
    setSelectedEarthquakes((prevFeatures) =>
      prevFeatures.filter((feature: any) => feature.properties.code !== code)
    );
  };

  const onZoom = (coords: [number, number]) => {
    if (!map) return;
    if (map) {
      map.flyTo({
        center: coords,
        zoom: 8,
        speed: 3,
        curve: 1,
        essential: true,
      });
    }
  };

  return (
    <div className="relative bg-white rounded-lg border-[0.75px] border-gray-100 shadow-lg py-4 px-6 text-blue-800">
      <div className="flex gap-4 justify-between">
        <div
          className={classNames(
            'px-2 py-1 w-min shadow-sm rounded-lg',
            magClass
          )}
        >
          <p className="text-white w-min font-semibold">
            {parseFloat(mag).toFixed(1)}
          </p>
        </div>
        <button
          onClick={(e) => {
            onZoom(coords);
            e.stopPropagation();
          }}
        >
          {/** black 600 */}
          <FaPaperPlane color="#0a8694" />
        </button>
      </div>

      {/** Starts the stuff under the magnitude and fly to */}
      <div className="flex flex-col pt-2">
        <p className="text-lg font-semibold">{name}</p>

        <p className="text-lg">{new Date(time).toLocaleString()}</p>
        <div className="flex pt-2 justify-between">
          <Link
            href={url}
            className="text-lg font-semibold underline"
            target="_blank"
          >
            Details
          </Link>
          <button
            onClick={(e) => {
              removeQuake();
              e.stopPropagation();
            }}
          >
            {/** royal blue 900 - same as text */}
            <FaTrashCan size="18px" color="#e71745" />
          </button>
        </div>
      </div>
    </div>
  );
};

//TODO: add sorting, mass delete
const QuakeCards = () => {
  const earthquakes = useAtomValue(store.map.selectedEarthquakesAtom);

  //TODO: return a map tool icon when null, or closed
  if (!earthquakes.length) null;
  return (
    <div className="flex flex-col gap-4 max-h-[55vh] overflow-scroll mb-1">
      {earthquakes.map((quake: any) => {
        return (
          <QuakeCard
            key={quake.properties.code}
            code={quake.properties.code}
            place={quake.properties.place}
            time={quake.properties.time}
            mag={quake.properties.mag}
            url={quake.properties.url}
            coords={quake.geometry.coordinates}
          />
        );
      })}
    </div>
  );
};

export default QuakeCards;
