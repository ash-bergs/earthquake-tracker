import { atom } from 'jotai';
import { Point, FeatureCollection } from 'geojson';
import { Earthquakes } from '@/types';
import { EarthquakeFeature } from '@/types';
import { processEarthquakeDataByHour, getMostActiveLocations } from './utils';
import earthquakeService from '@/utils/services/Earthquake';
import * as mapStore from './map';

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
    .slice(0, 5);
});

export const dailyActiveLocationsAtom = atom(async (get) => {
  const dailyEvents = await get(allDailyEventsAtom);
  if (!dailyEvents) return undefined;
  return getMostActiveLocations(dailyEvents);
});

// atom to return the geojson for the dailyEarthquakeLayer
export const dailyLayerGeoJSONAtom = atom(async (get) => {
  const earthquakes = await get(allDailyEventsAtom);
  const activeLayers = get(mapStore.activeLayersAtom);
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
