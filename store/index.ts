import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Feature, Point } from 'geojson';
import { MapRef } from 'react-map-gl';

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
