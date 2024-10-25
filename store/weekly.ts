import { atom } from 'jotai';
import { Feature, Point, FeatureCollection } from 'geojson';
import { Earthquakes } from '@/types';
import { EarthquakeFeature, EventsDateAndCount } from '@/types';
import * as mapStore from './map';
import { getMostActiveLocations } from './utils';

export const weeklyTopMagnitudeEventsAtom = atom<Feature<Point>[]>([]);

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
