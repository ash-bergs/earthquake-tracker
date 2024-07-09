'use client';
import Link from 'next/link';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectedEarthquakesAtom, useMap } from '@/store';
import { parsePlace } from './utils';
import { AiOutlineClose } from 'react-icons/ai';
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
  const map = useMap();
  const magnitude = Number(parseFloat(mag).toFixed(1));
  const setSelectedEarthquakes = useSetAtom(selectedEarthquakesAtom);

  /** color the magnitude section of the card based on event severity */
  const magClass = classNames({
    'bg-green-500': magnitude < 2,
    'bg-yellow-500': magnitude >= 2 && magnitude < 4,
    'bg-orange-500': magnitude >= 4 && magnitude < 6,
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
    <div
      className="relative bg-purple-heart-100 rounded-lg shadow-lg cursor-pointer p-3 text-color-purple-heart-950"
      onClick={() => onZoom(coords)}
    >
      <button
        className="absolute top-[10px] right-[10px]"
        onClick={(e) => {
          removeQuake();
          e.stopPropagation();
        }}
      >
        <AiOutlineClose color="#5236cc" />
      </button>
      <div
        className={classNames('p-[2px] px-[6px] w-min rounded-lg', magClass)}
      >
        <p
          style={{
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {parseFloat(mag).toFixed(1)}
        </p>
      </div>

      {/** divider */}
      <div>
        <p>{name}</p>
        <p>{new Date(time).toLocaleString()}</p>

        <Link href={url} target="_blank">
          Details
        </Link>
      </div>
    </div>
  );
};

//TODO: add sorting, mass delete
const QuakeCards = () => {
  const earthquakes = useAtomValue(selectedEarthquakesAtom);

  // return a map tool icon when null, or closed
  if (!earthquakes.length) return null;
  return (
    <div className="absolute top-[100px] right-[20px] bg-gray-500/50 z-1000 p-3 rounded-lg w-[250px] overflow-y-auto max-h-[80vh] shadow-lg">
      <div className="flex flex-col gap-2 rounded-lg">
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
    </div>
  );
};

export default QuakeCards;
