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
import earthquakeService from '@/utils/services/Earthquake';

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
export const activeLayersAtom = atom<any>({
  daily: {
    high: true,
    med: true,
    low: false, // default to showing med/high daily events
  },
  weekly: {
    high: false,
    med: false,
    low: false,
  },
});

// Sneaky, smelly helpers
//TODO: investigate improving these/making more reliable - moment js? a better ts option?
export const currentDateAtom = atom(new Date());

// current week's range (ending with today's date)
export const currentWeekRangeStringAtom = atom((get) => {
  const currentDate = get(currentDateAtom);
  const startOfRange = getStartOfRange(currentDate);

  return `${startOfRange.toLocaleDateString()} - ${currentDate.toLocaleDateString()}`;
});

/* ------------------------------- DAILY ATOMS ------------------------------ */

export const allDailyEventsAtom = atom<Promise<Earthquakes | undefined>>(
  async () => {
    const data = await earthquakeService.fetchDailyStats();
    return data;
  }
);

export const dailyEventsWithTimesAtom = atom(async (get) => {
  const dailyEvents = await get(allDailyEventsAtom);
  if (!dailyEvents) return null;

  const eventsByTime = dailyEvents.map((feature: EarthquakeFeature) => ({
    time: feature.properties?.time,
    magnitude: feature.properties?.mag,
  }));

  return eventsByTime;
});

export const processedDailyEventsWithTimesAtom = atom<
  Promise<{ hour: number; count: number }[] | null>
>(async (get) => {
  const dailyEvents = await get(dailyEventsWithTimesAtom);

  if (!dailyEvents) return null;

  return processEarthquakeDataByHour(dailyEvents);
});

export const dailyTopEventsAtom = atom(async (get) => {
  const dailyEvents = await get(allDailyEventsAtom);

  if (!dailyEvents) return undefined;

  // get the top 3 magnitude events
  return dailyEvents
    .sort(
      (a: EarthquakeFeature, b: EarthquakeFeature) =>
        b.properties?.mag - a.properties?.mag
    )
    .slice(0, 3);
});

export const dailyActiveLocationsAtom = atom(async (get) => {
  const dailyEvents = await get(allDailyEventsAtom);
  if (!dailyEvents) return undefined;
  return getMostActiveLocations(dailyEvents);
});

// atom to return the geojson for the dailyEarthquakeLayer
export const dailyLayerGeoJSONAtom = atom(async (get) => {
  const earthquakes = await get(allDailyEventsAtom);
  const activeLayers = get(activeLayersAtom);
  if (!earthquakes) return undefined;

  // define magnitude ranges in tuples
  const lowMagnitudeRange = [0, 3];
  const medMagnitudeRange = [3, 5];
  const highMagnitudeRange = [5, 10];

  const filteredEarthquakes = earthquakes.filter(
    (feature: EarthquakeFeature) => {
      const mag = feature.properties?.mag;
      if (
        activeLayers.daily.low &&
        mag >= lowMagnitudeRange[0] &&
        mag < lowMagnitudeRange[1]
      ) {
        return true;
      }
      if (
        activeLayers.daily.med &&
        mag >= medMagnitudeRange[0] &&
        mag < medMagnitudeRange[1]
      ) {
        return true;
      }
      if (activeLayers.daily.high && mag >= highMagnitudeRange[0]) {
        return true;
      }
      return false;
    }
  );

  const earthquakeGeoJSON: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: filteredEarthquakes,
  };

  return earthquakeGeoJSON;
});

/* ----------------------------------- end ---------------------------------- */

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

// atom to return the geojson for the weeklyEarthquakeLayer
export const weeklyLayerGeoJSONAtom = atom((get) => {
  const earthquakes = get(allWeeklyEventsAtom);
  const activeLayers = get(activeLayersAtom);
  if (!earthquakes) return undefined;

  const lowMagnitudeRange = [0, 3];
  const medMagnitudeRange = [3, 5];
  const highMagnitudeRange = [5, 10];

  const filteredEarthquakes = earthquakes.filter(
    (feature: EarthquakeFeature) => {
      const mag = feature.properties?.mag;
      if (
        activeLayers.weekly.low &&
        mag >= lowMagnitudeRange[0] &&
        mag < lowMagnitudeRange[1]
      ) {
        return true;
      }
      if (
        activeLayers.weekly.med &&
        mag >= medMagnitudeRange[0] &&
        mag < medMagnitudeRange[1]
      ) {
        return true;
      }
      if (activeLayers.weekly.high && mag >= highMagnitudeRange[0]) {
        return true;
      }
      return false;
    }
  );

  const earthquakeGeoJSON: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: filteredEarthquakes,
  };

  return earthquakeGeoJSON;
});
/* ---------------------------- END WEEKLY ATOMS ---------------------------- */
