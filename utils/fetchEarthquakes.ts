import axios from 'axios';
import { Earthquakes, EarthquakeFeature } from '@/types';

export const fetchEarthquakes = async (): Promise<Earthquakes> => {
  const res = await axios.get(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
  );

  return res.data.features;
};

// Right now we don't have this wired up to a database
// that's okay, we'll just do some pre-processing for now
// while this won't be the most efficient, it'll work for now
// in the future we can look into adding a database
// we'd then get some interesting tools to work with the geojson data
type ProcessedEarthquakes = {
  earthquakes: Earthquakes;
  topMagnitudeEvents: Earthquakes;
  totalCount: number;
};

export const fetchAndProcessEarthquakes =
  async (): Promise<ProcessedEarthquakes> => {
    const res = await axios.get(
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
    );

    const earthquakes = res.data.features;
    // reduce the earthquakes array to one - the one with the highest magnitude
    // on second thought - let's get the top 5 events
    // const highestMagnitude = earthquakes.reduce(
    //   (acc: EarthquakeFeature, curr: EarthquakeFeature) => {
    //     if (acc.properties?.mag > curr.properties?.mag) {
    //       return acc;
    //     }
    //     return curr;
    //   }
    // );
    const topMagnitudeEvents = earthquakes
      // sort array based on magnitude, in descending order
      .sort(
        (a: EarthquakeFeature, b: EarthquakeFeature) =>
          b.properties?.mag - a.properties?.mag
      )
      // take the top 5
      .slice(0, 5);

    const totalCount = earthquakes.length;

    return { earthquakes, topMagnitudeEvents, totalCount };
  };
