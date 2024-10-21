import { EarthquakeFeature } from '@/types';

export class EarthquakeService {
  private baseURL: string =
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary';

  private async fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(`Failed to fetch USGS data: ${res.statusText}`);
    return await res.json();
  }

  /** Fetch all earthquakes for the day */
  public async fetchDailyEarthquakes(): Promise<EarthquakeFeature[]> {
    const data = await this.fetchData<{ features: EarthquakeFeature[] }>(
      `${this.baseURL}/all_day.geojson`
    );
    return data.features;
  }

  /** Fetch all earthquakes for the week */
  public async fetchWeeklyEarthquakes(): Promise<EarthquakeFeature[]> {
    const data = await this.fetchData<{ features: EarthquakeFeature[] }>(
      `${this.baseURL}/all_week.geojson`
    );
    return data.features;
  }

  /** Fetch earthquake stats (graph data) for the day */
  public async fetchDailyStats(): Promise<EarthquakeFeature[]> {
    const data = await this.fetchData<{ features: EarthquakeFeature[] }>(
      `${this.baseURL}/2.5_day.geojson`
    );
    return data.features;
  }

  /** Fetch earthquake stats (graph data) for the week */
  public async fetchWeeklyStats(): Promise<EarthquakeFeature[]> {
    const data = await this.fetchData<{ features: EarthquakeFeature[] }>(
      `${this.baseURL}/2.5_week.geojson`
    );
    return data.features;
  }
}
