import axios from 'axios';
import { Earthquakes, EarthquakeFeature } from '@/types';

/** Fetch all the earthquake events from today so far */
export const fetchEarthquakes = async (): Promise<Earthquakes> => {
  const res = await axios.get(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
  );

  return res.data.features;
};

/** Fetch all the highest magnitude earthquakes from the last week */
export const fetchLastWeekTopMagnitudeEarthquakes =
  async (): Promise<Earthquakes> => {
    const res = await axios.get(
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'
    );

    const earthquakes = res.data.features;
    // sort and return 4, like the other function
    const weeklyTopMagnitudeEvents = earthquakes
      // sort array based on magnitude, in descending order
      .sort(
        (a: EarthquakeFeature, b: EarthquakeFeature) =>
          b.properties?.mag - a.properties?.mag
      )
      // take the top 5
      .slice(0, 4);

    return weeklyTopMagnitudeEvents;
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

/** Fetch earthquakes and process:
 * Get 4 highest magnitude events
 * Return total count of events
 */
export const fetchAndProcessEarthquakes =
  async (): Promise<ProcessedEarthquakes> => {
    const earthquakes = await fetchEarthquakes();
    const topMagnitudeEvents = earthquakes
      // sort array based on magnitude, in descending order
      .sort(
        (a: EarthquakeFeature, b: EarthquakeFeature) =>
          b.properties?.mag - a.properties?.mag
      )
      // take the top 5
      .slice(0, 4);
    const totalCount = earthquakes.length;

    return { earthquakes, topMagnitudeEvents, totalCount };
  };
