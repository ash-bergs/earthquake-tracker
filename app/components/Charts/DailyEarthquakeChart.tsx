import { ResponsiveBar } from '@nivo/bar';
import { useAtomValue } from 'jotai';
import { processedDailyEventsWithTimesAtom } from '@/store';

const colorScale = [
  '#3b82f6', // Blue
  '#10b981', // Green
  '#fbbf24', // Yellow
  '#f59e0b', // Orange
  '#ef4444', // Red
];

const getColorForCount = (count: number): string => {
  if (count <= 1) return colorScale[0];
  if (count <= 2) return colorScale[1];
  if (count <= 3) return colorScale[2];
  if (count <= 4) return colorScale[3];
  return colorScale[4];
};

const DailyEarthquakeChart: React.FC = () => {
  const data = useAtomValue(processedDailyEventsWithTimesAtom);

  if (!data) return null;

  const chartData = data.map((d) => ({
    hour: d.hour.toString().padStart(2, '0') + ':00',
    count: d.count,
    color: getColorForCount(d.count),
  }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveBar
        data={chartData}
        keys={['count']}
        indexBy="hour"
        margin={{ top: 20, right: 60, bottom: 80, left: 60 }}
        padding={0.5}
        colors={({ data }) => data.color}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: 'Hour of the Day (UTC)',
          legendPosition: 'middle',
          legendOffset: 60,
          tickValues: chartData
            .filter((_, index) => index % 4 === 0)
            .map((d) => d.hour), // Show every fourth tick
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of Events',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        tooltip={({ id, value, color }) => (
          <div
            style={{
              padding: '12px',
              color,
              background: '#222222',
            }}
          >
            <strong>
              {id}: {value}
            </strong>
          </div>
        )}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      />
    </div>
  );
};

export default DailyEarthquakeChart;
