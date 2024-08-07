'use client';
import React, { useCallback, useState, useRef } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import useSyncAtom from '@/store/useSyncAtom';
import {
  selectedEarthquakesAtom,
  mapRefAtom,
  allDailyEventsAtom,
  allWeeklyEventsAtom,
} from '@/store';
import ReactMapGL, { Popup, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Feature, Point } from 'geojson';
import DailyLayer from './layers/DailyEarthquakesLayer';
import WeeklyLayer from './layers/WeeklyEarthquakesLayer';

type MapProps = {
  earthquakes: Feature<Point>[];
  weeklyEarthquakes: Feature<Point>[];
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

// TODO: Add a layer for the weeks high magnitude events
const Map = ({ earthquakes, weeklyEarthquakes }: MapProps) => {
  // set the atoms that will feed the geojson to map layers
  // daily is ALL events today
  useSyncAtom(allDailyEventsAtom, earthquakes);
  // weekly is events over 2.5 magnitude
  useSyncAtom(allWeeklyEventsAtom, weeklyEarthquakes);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const setMapRef = useSetAtom(mapRefAtom);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [selectedEarthquakes, setSelectedEarthquakes] = useAtom(
    selectedEarthquakesAtom
  );

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

  const onMapLoad = useCallback(() => {
    if (mapRef.current) {
      setMapRef(mapRef.current);
    }
  }, [setMapRef]);

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
        interactiveLayerIds={['earthquake-layer', 'weekly-earthquake-layer']}
        interactive={true}
        onMouseMove={onHover}
        onClick={onClick}
        onDrag={clearPopup}
        onZoom={clearPopup}
        onLoad={onMapLoad}
        ref={mapRef}
      >
        <DailyLayer />
        <WeeklyLayer />
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
