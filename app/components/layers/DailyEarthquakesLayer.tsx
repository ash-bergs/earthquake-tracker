'use client';
import React from 'react';
import { useAtomValue } from 'jotai';
import { dailyLayerGeoJSONAtom, activeLayersAtom } from '@/store';
import { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// we'll break the daily and weekly layers into min, med, max
// but should we have a route that now just gets ALL teh data at once on page.tsx?
// or do we manage making the calls in atoms, and only fetch what's needed?

const DailyLayer = () => {
  const earthquakeGeoJSON = useAtomValue(dailyLayerGeoJSONAtom);
  const activeLayers = useAtomValue(activeLayersAtom);

  // TODO: If active layers for daily has no selection for low/med/high
  if (!activeLayers.daily) return null;

  return (
    <Source id="earthquake-layer" type="geojson" data={earthquakeGeoJSON}>
      <Layer
        id="earthquake-layer"
        type="circle"
        paint={{
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', 'mag'],
            6,
            12,
            18,
            24,
          ],
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'mag'],
            1,
            '#2DC4B2',
            2,
            '#3BB3C3',
            3,
            '#669EC4',
            4,
            '#8B88B6',
            5,
            '#A2719B',
            6,
            '#AA5E79',
          ],
          'circle-opacity': 0.8,
        }}
      />
    </Source>
  );
};

export default DailyLayer;
