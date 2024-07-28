import axios from 'axios';
import { Earthquakes, EarthquakeFeature } from '@/types';

//TODO: Why are we using axios? I could probably swap this for fetch and get some benefits from next
//TODO: Cleanup - lots of functions here doing super similar things - we can streamline them, and integrate them with atoms where appropriate

/** Fetch all the earthquake event geojson from today so far - all magnitudes */
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

/** Fetch today's significant events with timestamps */
export interface EarthquakeEvent {
  time: number; // Timestamp of the earthquake
  magnitude: number;
}

// Attempt at single function to handle all day needs
export const fetchDailyStats = async (): Promise<any> => {
  // fetch the earth quakes for the day
  const today = new Date();
  const startDate = today.toISOString().split('T')[0];
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

  const dailyEvents = res.data.features;

  //? Is this too much to do here? Should atoms handle it?
  // or is passing them data prepared straight up on the server a good move?

  // get the total number of significant magnitude events
  const dailyEventsTotal = dailyEvents.length;
  // sort by time and magnitude - for chart
  const dailyEventsWithTimes = dailyEvents.map(
    (feature: EarthquakeFeature) => ({
      time: feature.properties?.time,
      magnitude: feature.properties?.mag,
    })
  );
  // get the top 3 magnitude events
  const topMagnitudeDailyEvents = dailyEvents
    .sort(
      (a: EarthquakeFeature, b: EarthquakeFeature) =>
        b.properties?.mag - a.properties?.mag
    )
    .slice(0, 3);

  return {
    dailyEvents,
    dailyEventsTotal,
    dailyEventsWithTimes,
    topMagnitudeDailyEvents,
  };
};

/** Fetch this week's significant events */
const getWeekDateRange = () => {
  const today = new Date();
  const startDate = new Date(today.setDate(today.getDate() - today.getDay()));
  const endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
};

const getDayFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.getDay(); // will return 0 (Sunday) - 6 (Saturday)
};

export const fetchWeeklyStats = async (): Promise<any> => {
  const { startDate, endDate } = getWeekDateRange();

  // fetch the earthquake day of significant magnitude for the week
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

  const weeklyEvents = res.data.features;

  // total number of events
  const weeklyEventsTotal = weeklyEvents.length;

  const eventsByWeekday: EarthquakeFeature[][] = Array.from(
    { length: 7 },
    () => []
  );
  weeklyEvents.forEach((feature: EarthquakeFeature) => {
    const weekday = getDayFromTimestamp(feature.properties?.time);
    eventsByWeekday[weekday].push(feature);
  });

  // get the top three magnitude events
  const topMagnitudeWeeklyEvents = weeklyEvents
    .sort(
      (a: EarthquakeFeature, b: EarthquakeFeature) =>
        b.properties?.mag - a.properties?.mag
    )
    .slice(0, 3);

  return {
    weeklyEvents,
    weeklyEventsTotal,
    topMagnitudeWeeklyEvents,
    eventsByWeekday,
  };
};
