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
  // maybe we'll just return the events - and the chart prepared data
  // the other things can be done on the client and we can have spinners

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
const getDayFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.getDay(); // will return 0 (Sunday) - 6 (Saturday)
};

export const fetchWeeklyStats = async (): Promise<any> => {
  // fetch the earthquake day of significant magnitude for the week
  const res = await axios.get(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson'
  );

  const weeklyEvents = res.data.features;

  // total number of events
  const weeklyEventsTotal = weeklyEvents.length;
  // get events by weekday
  // days will be 0 - 6 starting on Sunday, ending on Saturday
  // we might consider handling that here
  const eventsByWeekday = weeklyEvents.reduce(
    (acc: { [key: number]: number }, feature: EarthquakeFeature) => {
      const weekday = getDayFromTimestamp(feature.properties?.time);
      if (weekday !== -1) {
        if (!acc[weekday]) {
          acc[weekday] = 0;
        }
        acc[weekday]++;
      }
      return acc;
    },
    {} as { [key: number]: number }
  );
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
