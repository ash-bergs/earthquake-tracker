import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Feature, Point } from 'geojson';
import { MapRef } from 'react-map-gl';
import { EarthquakeEvent } from '@/utils/fetchEarthquakes';
import { Earthquakes } from '@/types';
import { EarthquakeFeature } from '@/types';
import {
  getStartOfRange,
  processEarthquakeDataByHour,
  getMostActiveLocations,
} from './utils';

//TODO: Move helpers to an atoms utils module

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

// current week's range (ending with today's date)
export const currentWeekRangeStringAtom = atom((get) => {
  const currentDate = get(currentDateAtom);
  const startOfRange = getStartOfRange(currentDate);

  return `${startOfRange.toDateString()} - ${currentDate.toDateString()}`;
});

/* ------------------------------- DAILY ATOMS ------------------------------ */
export const dailyEventsWithTimesAtom = atom<EarthquakeEvent[] | undefined>(
  undefined
);

export const allDailyEventsAtom = atom<Earthquakes | undefined>(undefined);

export const processedDailyEventsWithTimesAtom = atom<
  { hour: number; count: number }[] | undefined
>((get) => {
  const dailyEvents = get(dailyEventsWithTimesAtom);

  if (!dailyEvents) return undefined;

  return processEarthquakeDataByHour(dailyEvents);
});

export const dailyTopEventsAtom = atom((get) => {
  const dailyEvents = get(allDailyEventsAtom);

  if (!dailyEvents) return undefined;

  // get the top 3 magnitude events
  return dailyEvents
    .sort(
      (a: EarthquakeFeature, b: EarthquakeFeature) =>
        b.properties?.mag - a.properties?.mag
    )
    .slice(0, 3);
});

export const dailyActiveLocationsAtom = atom((get) => {
  const dailyEvents = get(allDailyEventsAtom);
  if (!dailyEvents) return undefined;
  return getMostActiveLocations(dailyEvents);
});

/* ----------------------------- END DAILY ATOMS ---------------------------- */

/* ------------------------------ WEEKLY ATOMS ------------------------------ */
export const allWeeklyEventsAtom = atom<Earthquakes | undefined>(undefined);

export const weeklyTopEventsAtom = atom((get) => {
  const weeklyEvents = get(allWeeklyEventsAtom);

  if (!weeklyEvents) return undefined;

  return weeklyEvents
    .sort(
      (a: EarthquakeFeature, b: EarthquakeFeature) =>
        b.properties?.mag - a.properties?.mag
    )
    .slice(0, 3);
});

export const weeklyActiveLocationsAtom = atom((get) => {
  const weeklyEvents = get(allWeeklyEventsAtom);
  if (!weeklyEvents) return undefined;
  return getMostActiveLocations(weeklyEvents);
});

type EventsByWeekday = {
  [key: string]: number;
};

export const eventsByWeekdayAtom = atom<EventsByWeekday | undefined>(undefined);
/* ---------------------------- END WEEKLY ATOMS ---------------------------- */
