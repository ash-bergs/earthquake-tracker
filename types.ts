import { Feature, Point } from 'geojson';

export type EarthquakeFeature = Feature<Point>;

export type Earthquakes = EarthquakeFeature[];
