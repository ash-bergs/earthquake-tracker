'use client';
import Link from 'next/link';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectedEarthquakesAtom, useMap } from '@/store';
import { parsePlace } from './utils';

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
  const setSelectedEarthquakes = useSetAtom(selectedEarthquakesAtom);

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
      className="relative bg-white rounded-lg shadow-lg cursor-pointer p-3"
      onClick={() => onZoom(coords)}
    >
      <button
        className="absolute top-[10px] right-[10px]"
        onClick={removeQuake}
      >
        X
      </button>
      <div className="bg-red-500 p-[2px] px-[6px] w-min rounded-lg">
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

const dummyData = [
  {
    type: 'Feature',
    state: {},
    geometry: {
      type: 'Point',
      coordinates: [21.224212646484375, 37.78808138412046],
    },
    properties: {
      mag: 4.7,
      place: '7 km WSW of Savália, Greece',
      time: 1720363264550,
      updated: 1720367125750,
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us7000mxlv',
      detail:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us7000mxlv.geojson',
      felt: 1,
      cdi: 2,
      status: 'reviewed',
      tsunami: 0,
      sig: 340,
      net: 'us',
      code: '7000mxlv',
      ids: ',us7000mxlv,',
      sources: ',us,',
      types: ',dyfi,origin,phase-data,',
      nst: 59,
      dmin: 0.825,
      rms: 1.06,
      gap: 86,
      magType: 'mb',
      type: 'earthquake',
      title: 'M 4.7 - 7 km WSW of Savália, Greece',
    },
    layer: {
      id: 'earthquake-layer',
      type: 'circle',
      source: 'earthquake-layer',
      paint: {
        'circle-radius': 18.799999999999997,
        'circle-color': {
          r: 0.6082352941176471,
          g: 0.47019607843137246,
          b: 0.6396078431372549,
          a: 1,
        },
        'circle-opacity': 0.8,
      },
      layout: {},
    },
    source: 'earthquake-layer',
  },
  {
    type: 'Feature',
    state: {},
    geometry: {
      type: 'Point',
      coordinates: [162.059326171875, 55.578344672182055],
    },
    properties: {
      mag: 5.5,
      place: '76 km SSW of Ust’-Kamchatsk Staryy, Russia',
      time: 1720353332808,
      updated: 1720360915565,
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us7000mxl6',
      detail:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us7000mxl6.geojson',
      mmi: 4.629,
      alert: 'green',
      status: 'reviewed',
      tsunami: 0,
      sig: 465,
      net: 'us',
      code: '7000mxl6',
      ids: ',us7000mxl6,',
      sources: ',us,',
      types: ',losspager,origin,phase-data,shakemap,',
      nst: 159,
      dmin: 3.247,
      rms: 0.61,
      gap: 72,
      magType: 'mww',
      type: 'earthquake',
      title: 'M 5.5 - 76 km SSW of Ust’-Kamchatsk Staryy, Russia',
    },
    layer: {
      id: 'earthquake-layer',
      type: 'circle',
      source: 'earthquake-layer',
      paint: {
        'circle-radius': 22,
        'circle-color': {
          r: 0.6509803921568627,
          g: 0.40588235294117647,
          b: 0.5411764705882353,
          a: 1,
        },
        'circle-opacity': 0.8,
      },
      layout: {},
    },
    source: 'earthquake-layer',
  },
  {
    type: 'Feature',
    state: {},
    geometry: {
      type: 'Point',
      coordinates: [-62.46826171875, 10.898042159726003],
    },
    properties: {
      mag: 4.5,
      place: '39 km NNW of Güiria, Venezuela',
      time: 1720336074408,
      updated: 1720339342040,
      url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us7000mxju',
      detail:
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us7000mxju.geojson',
      status: 'reviewed',
      tsunami: 0,
      sig: 312,
      net: 'us',
      code: '7000mxju',
      ids: ',us7000mxju,',
      sources: ',us,',
      types: ',origin,phase-data,',
      nst: 48,
      dmin: 1.462,
      rms: 1.26,
      gap: 91,
      magType: 'mb',
      type: 'earthquake',
      title: 'M 4.5 - 39 km NNW of Güiria, Venezuela',
    },
    layer: {
      id: 'earthquake-layer',
      type: 'circle',
      source: 'earthquake-layer',
      paint: {
        'circle-radius': 17.999999999999996,
        'circle-color': {
          r: 0.5901960784313725,
          g: 0.48823529411764705,
          b: 0.6607843137254902,
          a: 1,
        },
        'circle-opacity': 0.8,
      },
      layout: {},
    },
    source: 'earthquake-layer',
  },
];

//TODO: add sorting, mass delete
const QuakeCards = () => {
  const earthquakes = useAtomValue(selectedEarthquakesAtom);
  const setSelectedEarthquakes = useSetAtom(selectedEarthquakesAtom);

  const removeQuake = (quake: any) => {
    setSelectedEarthquakes((prevFeatures) =>
      prevFeatures.filter(
        (feature: any) => feature.properties.code !== quake.properties.code
      )
    );
  };
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
