import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Feature, Point, FeatureCollection } from 'geojson';
import { MapRef } from 'react-map-gl';
import { EventTimeAndMagnitude } from '@/utils/fetchEarthquakes';
import { Earthquakes } from '@/types';
import { EarthquakeFeature, EventsDateAndCount } from '@/types';
import {
  getStartOfRange,
  processEarthquakeDataByHour,
  getMostActiveLocations,
} from './utils';

export const toolPanelOpenAtom = atom<Boolean>(true);

export const earthquakesAtom = atom<Feature<Point>[]>([]);

export const weeklyTopMagnitudeEventsAtom = atom<Feature<Point>[]>([]);

export const selectedEarthquakesAtom = atom<Feature<Point>[]>([]);

export const mapRefAtom = atom<MapRef | null>(null);

/** Hook to use the map reference */
// this makes it so we can perform actions without passing them from the map
export const useMap = () => useAtomValue(mapRefAtom);
export const setMap = () => useSetAtom(mapRefAtom);

/** Map Layer Configuration */
// I see this getting really out of hand if the number of layers were to scale...
export const activeLayersAtom = atom<any>({
  daily: true,
  weekly: false,
});

// Sneaky helpers
//TODO: investigate improving these/making more reliable - moment js? a better ts option?
export const currentDateAtom = atom(new Date());

// current week's range (ending with today's date)
export const currentWeekRangeStringAtom = atom((get) => {
  const currentDate = get(currentDateAtom);
  const startOfRange = getStartOfRange(currentDate);

  return `${startOfRange.toLocaleDateString()} - ${currentDate.toLocaleDateString()}`;
});

/* ------------------------------- DAILY ATOMS ------------------------------ */
export const dailyEventsWithTimesAtom = atom<
  EventTimeAndMagnitude[] | undefined
>(undefined);

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

export const dailyLayerGeoJSONAtom = atom((get) => {
  const earthquakes = get(allDailyEventsAtom);
  if (!earthquakes) return undefined;
  const earthquakeGeoJSON: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: earthquakes,
  };
  return earthquakeGeoJSON;
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

export const EventsDateAndCountAtom = atom<EventsDateAndCount | undefined>(
  undefined
);

export const weeklyLayerGeoJSONAtom = atom((get) => {
  const earthquakes = get(allWeeklyEventsAtom);
  if (!earthquakes) return undefined;
  const earthquakeGeoJSON: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: earthquakes,
  };
  return earthquakeGeoJSON;
});
/* ---------------------------- END WEEKLY ATOMS ---------------------------- */
