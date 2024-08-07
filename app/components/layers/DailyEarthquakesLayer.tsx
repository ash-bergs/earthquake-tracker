'use client';
import React from 'react';
import { useAtomValue } from 'jotai';
import { dailyLayerGeoJSONAtom, activeLayersAtom } from '@/store';
import { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const DailyLayer = () => {
  //get the value of earthquake geo json atom
  const earthquakeGeoJSON = useAtomValue(dailyLayerGeoJSONAtom);
  const activeLayers = useAtomValue(activeLayersAtom);
  // get value of layer config - build some type of "selected layers" atom to track what's turned on and off
  // if daily layer not selected, return null

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
