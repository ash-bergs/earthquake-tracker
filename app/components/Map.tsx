'use client';
import React, { useCallback, useState, useRef } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { selectedEarthquakesAtom, mapRefAtom } from '@/store';
import ReactMapGL, { Source, Layer, Popup, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Feature, FeatureCollection, Point } from 'geojson';

type MapProps = {
  earthquakes: Feature<Point>[];
};

type PopupInfo = {
  longitude: number;
  latitude: number;
  properties: {
    mag: number;
    place: string;
    time: number;
  };
  x: number;
  y: number;
};
// TODO: breakout the layers
// TODO: Add a layer for the weeks high magnitude events
const Map = ({ earthquakes }: MapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const setMapRef = useSetAtom(mapRefAtom);

  const onMapLoad = useCallback(() => {
    if (mapRef.current) {
      setMapRef(mapRef.current);
    }
  }, [setMapRef]);

  const [selectedEarthquakes, setSelectedEarthquakes] = useAtom(
    selectedEarthquakesAtom
  );
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);

  // we can just return this ssr?
  const earthquakeGeoJSON: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: earthquakes,
  };

  const onHover = (event: any) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    if (hoveredFeature) {
      setPopupInfo({
        longitude: hoveredFeature.geometry.coordinates[0],
        latitude: hoveredFeature.geometry.coordinates[1],
        properties: hoveredFeature.properties,
        x,
        y,
      });
    }
  };

  const clearPopup = () => {
    setPopupInfo(null);
  };

  const onClick = (event: any) => {
    const { features } = event;
    const clickedFeature = features && features[0];

    if (clickedFeature) {
      const exists = selectedEarthquakes.some(
        (feature: Feature<Point>) =>
          feature.properties?.code === clickedFeature.properties.code
      );
      if (exists) return;

      setSelectedEarthquakes((prevFeatures) => [
        ...prevFeatures,
        clickedFeature,
      ]);
    }
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 60px)',
      }}
      ref={mapContainerRef}
    >
      <ReactMapGL
        initialViewState={{
          longitude: 120, // Center longitude between the US west coast and Southeast Asia east coast
          latitude: 0, // Equator to get a central view
          zoom: 2, // Zoomed out to show a large area
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/navigation-day-v1"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        interactiveLayerIds={['earthquake-layer']}
        interactive={true}
        onMouseMove={onHover}
        onClick={onClick}
        onDrag={clearPopup}
        onZoom={clearPopup}
        onLoad={onMapLoad}
        ref={mapRef}
      >
        {earthquakes.length > 0 && (
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
        )}
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeButton={false}
            closeOnClick={false}
            anchor="top"
          >
            <div>
              <strong>Magnitude:</strong> {popupInfo.properties.mag}
              <br />
              <strong>Place:</strong> {popupInfo.properties.place}
              <br />
              <strong>Time:</strong>{' '}
              {new Date(popupInfo.properties.time).toLocaleString()}
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
