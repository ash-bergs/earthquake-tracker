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
export interface EventTimeAndMagnitude {
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

  // sort by time and magnitude - for chart
  const dailyEventsWithTimes = dailyEvents.map(
    (feature: EarthquakeFeature) => ({
      time: feature.properties?.time,
      magnitude: feature.properties?.mag,
    })
  );

  return {
    dailyEvents,
    dailyEventsWithTimes,
  };
};

export const fetchWeeklyStats = async (): Promise<any> => {
  // fetch the earthquake day of significant magnitude for the week
  const res = await axios.get(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson'
  );

  const weeklyEvents = res.data.features;

  // sort events by date
  // ensure days are in correct order, ending with today
  const eventsByDate = weeklyEvents.reduce(
    (acc: { [date: string]: number }, feature: EarthquakeFeature) => {
      const date = new Date(feature.properties?.time)
        .toISOString()
        .split('T')[0];
      if (!acc[date]) {
        acc[date] = 0; // start at 0?
      }
      acc[date]++;
      return acc;
    },
    {} as { [date: string]: number }
  );

  return {
    weeklyEvents,
    eventsByDate,
  };
};
