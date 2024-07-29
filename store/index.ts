import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Feature, Point } from 'geojson';
import { MapRef } from 'react-map-gl';
import { EarthquakeEvent } from '@/utils/fetchEarthquakes';
import { Earthquakes } from '@/types';

export const toolPanelOpenAtom = atom<Boolean>(true);

export const earthquakesAtom = atom<Feature<Point>[]>([]);

export const weeklyTopMagnitudeEventsAtom = atom<Feature<Point>[]>([]);

export const selectedEarthquakesAtom = atom<Feature<Point>[]>([]);

export const mapRefAtom = atom<MapRef | null>(null);

/** Hook to use the map reference */
// this makes it so we can perform actions without passing them from the map
export const useMap = () => useAtomValue(mapRefAtom);
export const setMap = () => useSetAtom(mapRefAtom);

// Sneaky helpers

export const currentDateAtom = atom(new Date());

// current date gets the date and returns as a string
export const currentDateStringAtom = atom((get) =>
  get(currentDateAtom).toDateString()
);

// helper to calculate the start of the week to today
const getStartOfRange = (date: Date) => {
  const currentDate = new Date(date);
  const startOfRange = new Date(currentDate);
  startOfRange.setDate(currentDate.getDate() - 7);
  return startOfRange;
};

// current week's range (ending with today's date)
export const currentWeekRangeStringAtom = atom((get) => {
  const currentDate = get(currentDateAtom);
  const startOfRange = getStartOfRange(currentDate);

  return `${startOfRange.toDateString()} - ${currentDate.toDateString()}`;
});

// NEW ATOMS
export const dailyEventsWithTimesAtom = atom<EarthquakeEvent[] | undefined>(
  undefined
);

export const allDailyEventsAtom = atom<Earthquakes | undefined>(undefined);

export const processedDailyEventsWithTimesAtom = atom<
  { hour: number; count: number }[] | undefined
>((get) => {
  const dailyEvents = get(dailyEventsWithTimesAtom);

  if (!dailyEvents) return undefined;

  return processEarthquakeData(dailyEvents);
});

const processEarthquakeData = (
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

export const dailyActiveLocationsAtom = atom((get) => {
  const dailyEvents = get(allDailyEventsAtom);
  if (!dailyEvents) return undefined;
  return getMostActiveLocations(dailyEvents);
});

// most active locations
// I don't have a table of country geometries to compare features to... but maybe I could create one?
const getMostActiveLocations = (earthquakes: Earthquakes) => {
  const regions: { [key: string]: number } = {};

  earthquakes.forEach((event) => {
    const region = event.properties?.place.split(', ').pop();

    if (regions[region]) {
      regions[region]++;
    } else {
      regions[region] = 1;
    }
  });

  const sortedRegions = Object.entries(regions).sort((a, b) => b[1] - a[1]);
  return sortedRegions.slice(0, 3).map((region) => region[0]);
};
