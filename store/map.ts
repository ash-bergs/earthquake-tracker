import { atom } from 'jotai';
import { Feature, Point } from 'geojson';
import { MapRef } from 'react-map-gl';

export const earthquakesAtom = atom<Feature<Point>[]>([]);
export const selectedEarthquakesAtom = atom<Feature<Point>[]>([]);

export const mapRefAtom = atom<MapRef | null>(null);

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

export const toolPanelOpenAtom = atom<Boolean>(true);
