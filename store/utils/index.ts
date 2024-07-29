import { EarthquakeEvent } from '@/utils/fetchEarthquakes';
import { Earthquakes } from '@/types';
// helper to calculate the start of the week to today
export const getStartOfRange = (date: Date) => {
  const currentDate = new Date(date);
  const startOfRange = new Date(currentDate);
  startOfRange.setDate(currentDate.getDate() - 7);
  return startOfRange;
};

// we're processing this data twice, once on the request, and once here - seems a little confusing
/** Helper to organize events by time of day - DAILY */
export const processEarthquakeDataByHour = (
  events: EarthquakeEvent[]
): { hour: number; count: number }[] => {
  const hourlyCounts = Array(24).fill(0);

  events.forEach((event) => {
    const date = new Date(event.time);
    const hour = date.getUTCHours(); // using UTC hour - we can handle converting later
    hourlyCounts[hour]++;
  });

  return hourlyCounts.map((count, hour) => ({ hour, count }));
};

// I don't have a table of country geometries to compare features to... but maybe I could create one?
export const getMostActiveLocations = (earthquakes: Earthquakes) => {
  const regions: { [key: string]: number } = {};

  // not the most reliable search, but there's no control over the API here
  // count and group events by their `place` prop
  earthquakes.forEach((event) => {
    const region = event.properties?.place.split(', ').pop();

    if (regions[region]) {
      regions[region]++;
    } else {
      regions[region] = 1;
    }
  });

  // sort the region by times they appeared
  const sortedRegions = Object.entries(regions).sort((a, b) => b[1] - a[1]);
  // return the most seen place
  return sortedRegions.slice(0, 3).map((region) => region[0]);
};
