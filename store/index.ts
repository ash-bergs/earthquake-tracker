import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Feature, Point } from 'geojson';
import { MapRef } from 'react-map-gl';

export const earthquakesAtom = atom<Feature<Point>[]>([]);

export const selectedEarthquakesAtom = atom<Feature<Point>[]>([]);

export const mapRefAtom = atom<MapRef | null>(null);

/** Hook to use the map reference */
// this makes it so we can perform actions without passing them from the map
export const useMap = () => useAtomValue(mapRefAtom);
export const setMap = () => useSetAtom(mapRefAtom);
