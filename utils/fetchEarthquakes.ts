import axios from 'axios';
import { Earthquakes, EarthquakeFeature } from '@/types';

//TODO: Why are we using axios? I could probably swap this for fetch and get some benefits from next
//TODO: Cleanup - lots of functions here doing super similar things - we can streamline them, and integrate them with atoms where appropriate

/** Fetch all the earthquake events from today so far */
export const fetchEarthquakes = async (): Promise<Earthquakes> => {
  const res = await axios.get(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
  );

  return res.data.features;
};

/** Fetch significant earthquakes () */
// This is only returning one for today?? Maybe need to format differently
export const fetchSignificantEarthquakes = async (): Promise<Earthquakes> => {
  const res = await axios.get(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson'
  );

  return res.data.features;
};

export const fetchTodaySignificantEvents = async (): Promise<
  number | undefined
> => {
  const today = new Date();

  const startDate = today.toISOString().split('T')[0]; // Gets current date in YYYY-MM-DD format

  // Get next day's date
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const endDate = tomorrow.toISOString().split('T')[0]; // Gets next date in YYYY-MM-DD format

  const res = await axios.get(
    'https://earthquake.usgs.gov/fdsnws/event/1/query',
    {
      params: {
        format: 'geojson',
        starttime: startDate,
        endtime: endDate,
        minmagnitude: 2.5,
      },
    }
  );

  return res.data.features.length;
};

/** Fetch all the highest magnitude earthquakes from the last week */
export const fetchLastWeekTopMagnitudeEarthquakes =
  async (): Promise<Earthquakes> => {
    const res = await axios.get(
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'
    );

    const earthquakesAbove4 = res.data.features;
    // sort and return 4, like the other function
    const weeklyTopMagnitudeEvents = earthquakesAbove4
      // sort array based on magnitude, in descending order
      .sort(
        (a: EarthquakeFeature, b: EarthquakeFeature) =>
          b.properties?.mag - a.properties?.mag
      )
      // take the top 5
      .slice(0, 3);

    return weeklyTopMagnitudeEvents;
  };

/** Get the count of the last week's events */
// over 2.5 magnitude
export const fetchAllLastWeekEarthquakes = async (): Promise<number> => {
  const res = await axios.get(
    'https://earthquake.usgs.gov/fdsnws/event/1/query',
    {
      params: {
        format: 'geojson',
        starttime: new Date(
          new Date().setDate(new Date().getDate() - 7)
        ).toISOString(),
        endtime: new Date().toISOString(),
        minmagnitude: 2.5,
      },
    }
  );

  const allEvents = res.data.features;

  return allEvents.length;
};

// Right now we don't have this wired up to a database
// that's okay, we'll just do some pre-processing for now
// while this won't be the most efficient, it'll work for now
// in the future we can look into adding a database
// we'd then get some interesting tools to work with the geojson data
type ProcessedEarthquakes = {
  earthquakes: Earthquakes;
  topMagnitudeEvents: Earthquakes;
  dailyTotalEvents: number;
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
      .slice(0, 3);
    const dailyTotalEvents = earthquakes.length;

    return { earthquakes, topMagnitudeEvents, dailyTotalEvents };
  };

/** Fetch today's significant events with timestamps */
export interface EarthquakeEvent {
  time: number; // Timestamp of the earthquake
  magnitude: number;
}

export const fetchTodaySignificantEventsWithTimes = async (): Promise<
  EarthquakeEvent[] | undefined
> => {
  const today = new Date();

  const startDate = today.toISOString().split('T')[0];

  // Get next day's date
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const endDate = tomorrow.toISOString().split('T')[0];

  const res = await axios.get(
    'https://earthquake.usgs.gov/fdsnws/event/1/query',
    {
      params: {
        format: 'geojson',
        starttime: startDate,
        endtime: endDate,
        minmagnitude: 2.5,
      },
    }
  );

  return res.data.features.map((feature: any) => ({
    time: feature.properties.time,
    magnitude: feature.properties.mag,
  }));
};
