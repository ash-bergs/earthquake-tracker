import { atom } from 'jotai';
import { Feature, Point, FeatureCollection } from 'geojson';
import { Earthquakes } from '@/types';
import { EarthquakeFeature, EventsDateAndCount } from '@/types';
import * as mapStore from './map';
import { getMostActiveLocations } from './utils';
import earthquakeService from '@/utils/services/Earthquake';

export const weeklyTopMagnitudeEventsAtom = atom<Feature<Point>[]>([]);

/* ----------------------------------- NEW ---------------------------------- */
export const allWeeklyEventsAtom = atom<Promise<Earthquakes | undefined>>(
  async () => {
    const data = await earthquakeService.fetchWeeklyStats();
    return data;
  }
);

/* ----------------------------------- END ---------------------------------- */

export const weeklyTopEventsAtom = atom(async (get) => {
  const weeklyEvents = await get(allWeeklyEventsAtom);

  if (!weeklyEvents) return undefined;

  return weeklyEvents
    .sort(
      (a: EarthquakeFeature, b: EarthquakeFeature) =>
        b.properties?.mag - a.properties?.mag
    )
    .slice(0, 3);
});

export const weeklyActiveLocationsAtom = atom(async (get) => {
  const weeklyEvents = await get(allWeeklyEventsAtom);
  if (!weeklyEvents) return undefined;
  return getMostActiveLocations(weeklyEvents);
});

export const EventsDateAndCountAtom = atom(async (get) => {
  const weeklyEvents = await get(allWeeklyEventsAtom);

  if (!weeklyEvents) return null;

  // sort events by date ensure days are in correct order, ending with today
  const eventsByDate = weeklyEvents.reduce(
    (acc: { [date: string]: number }, feature: EarthquakeFeature) => {
      const date = new Date(feature.properties?.time)
        .toISOString()
        .split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    },
    {} as { [date: string]: number }
  );

  return eventsByDate;
});

// atom to return the geojson for the weeklyEarthquakeLayer
export const weeklyLayerGeoJSONAtom = atom(async (get) => {
  const earthquakes = await get(allWeeklyEventsAtom);
  const activeLayers = get(mapStore.activeLayersAtom);
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
