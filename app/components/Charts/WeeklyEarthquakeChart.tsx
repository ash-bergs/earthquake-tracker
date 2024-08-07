import { ResponsiveBar } from '@nivo/bar';
import { useAtomValue } from 'jotai';
import { EventsDateAndCountAtom } from '@/store';

const colorScale = [
  '#bae6fd', // Light Blue
  '#7dd3fc', // Medium Blue
  '#38bdf8', // Darker Blue
  '#ff6d82', // Light Peachy
  '#fa506d', // Peachy
];

const getColorForCount = (count: number): string => {
  if (count <= 50) return colorScale[0];
  if (count > 50 && count <= 70) return colorScale[1];
  if (count > 70 && count <= 100) return colorScale[2];
  if (count > 100 && count <= 100) return colorScale[3];
  return colorScale[4];
};

const WeeklyEarthquakeChart: React.FC = () => {
  const data = useAtomValue(EventsDateAndCountAtom);

  if (!data) return null;

  // make a structure for the graph - [{day: string, count: number, color: string}]
  const chartData = Object.entries(data)
    .map(([day, count]) => ({
      date: day,
      count,
      color: getColorForCount(count),
    }))
    .reverse(); // reverse to lead UP to today, as the week range displays

  return (
    <div style={{ width: '100%', height: '100%', minWidth: '325px' }}>
      <ResponsiveBar
        data={chartData}
        // keys determines the height of each bar
        keys={['count']}
        // x-axis
        indexBy="date"
        margin={{ top: 20, right: 60, bottom: 80, left: 60 }}
        padding={0.5}
        // colors can be a fn of a string array
        colors={({ data }) => data.color}
        // min and max for the y axis
        minValue={0}
        maxValue={100}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: 'Date',
          legendPosition: 'middle',
          legendOffset: 70,
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

export default WeeklyEarthquakeChart;
